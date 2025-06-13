"use server";

import { prisma } from "@/db/prisma";
import { Ticket } from "@/generated/prisma";
import { getAuthStatus } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// !------ LEARNING -------!
// 1. Creating custom validation instead of using Zod to parse the incoming data
// 2. Handling several errors at the same time inside of the incoming data
// 3. Using TypeScript

// Type for the validation data
type CreateTicketParsedData = {
  subject: string;
  description: string;
  priority: string;
};

// This defines a union type for the result of validating a form.
// The result can either be a success (with parsed data) or a failure (with field-specific error messages).
type ValidationResult =
  | {
      success: false;
      // 'errors' is an object where each key is one of the field names from CreateTicketParsedData
      // and the value is a string error message. 'Partial' makes the keys optional,
      // meaning only the fields with errors need to be included.
      // Record takes two parameters: (1) the keys of the object, and (2) the type of the values associated with those keys
      fieldErrors: Partial<Record<keyof CreateTicketParsedData, string>>;
    }
  | {
      success: true;
      // On success, return the validated form data
      parsedData: CreateTicketParsedData;
    };

export const createTicketFormValidation = async (
  form: FormData
): Promise<ValidationResult> => {
  const subject = form.get("subject");
  const description = form.get("description");
  const priority = form.get("priority");

  const fieldErrors: Partial<Record<keyof CreateTicketParsedData, string>> = {};

  // using typeof to check that the key values are actually of type string
  // Using .trim() to check that the value are not empty string/whitespaces
  if (typeof subject !== "string" || subject.trim() === "") {
    fieldErrors.subject = "Subject is required";
  }

  if (typeof description !== "string" || description.trim() === "") {
    fieldErrors.description = "Description is required";
  }

  if (typeof priority !== "string" || priority.trim() === "") {
    fieldErrors.priority = "Priority is required";
  }

  // If the errors is larger than 0, return errors
  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  return {
    success: true,
    parsedData: {
      // We're using `as string` here because `form.get(...)` returns `FormDataEntryValue | null`
      // and TypeScript doesn't know that we've already checked the values above.
      // Since we've validated that all these are strings, we can safely cast them.
      subject: subject as string,
      description: description as string,
      priority: priority as string,
    },
  };
};

export type TicketFormState =
  | {
      success: false;
      message?: string;
      error?: string;
      fieldErrors: Partial<Record<keyof CreateTicketParsedData, string>>;
    }
  | { success: true; message: string };

// ------------ Actions --------------

// Create
export const createTicket = async (
  prevState: TicketFormState,
  form: FormData
): Promise<TicketFormState> => {
  // Security
  // Check Auth
  // Validate the request | DONT TRUST THE DATA
  const { isAuthed, email } = await getAuthStatus();

  if (!isAuthed) {
    return {
      success: false,
      error: "User must be authenticated",
      fieldErrors: {},
    };
  }

  const result = await createTicketFormValidation(form);

  if (!result.success) {
    return {
      success: result.success,
      fieldErrors: result.fieldErrors,
    };
  }

  try {
    await prisma.ticket.create({
      data: {
        ...result.parsedData,
        user: {
          connect: { email: email! },
        },
      },
    });

    return {
      success: true,
      message: "Ticket created successfully",
    };
  } catch (error) {
    console.error("Error inside createTicket: ", error);
    return {
      success: false,
      error: "Something vent wrong",
      fieldErrors: {},
    };
  }
};

type GetTicketsResponse =
  | { success: true; tickets: Ticket[] }
  | { success: false; error: string };

// Get Tickets
export const getTickets = async (): Promise<GetTicketsResponse> => {
  const { isAuthed } = await getAuthStatus();
  if (!isAuthed) {
    return { success: false, error: "User must be authenticated" };
  }
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { success: true, tickets };
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return { success: false, error: "Something vent wrong" };
  }
};

type GetSingleTicketResponse =
  | { success: true; ticket: Ticket }
  | { success: false; error: string };

export const getSingleTicket = async (
  id: string
): Promise<GetSingleTicketResponse> => {
  const { isAuthed } = await getAuthStatus();
  if (!isAuthed) {
    return { success: false, error: "User must be authenticated" };
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!ticket) {
      return { success: false, error: "Ticket not found" };
    }

    return {
      success: true,
      ticket: ticket,
    };
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    return { success: false, error: "Something vent wrong" };
  }
};

// Delete ticket
export async function closeTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const ticketId = Number(formData.get("ticketId"));

  if (!ticketId) {
    return { success: false, message: "Ticket ID is Required" };
  }

  const { isAuthed, email } = await getAuthStatus();

  if (!isAuthed) {
    return { success: false, message: "Unauthorized" };
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { user: true },
  });

  if (!ticket || !ticket.user) {
    return {
      success: false,
      message: "Ticket or associated user not found",
    };
  }

  if (ticket.user.email !== email) {
    return {
      success: false,
      message: "You are not authorized to close this ticket",
    };
  }

  await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: "Closed" },
  });

  revalidatePath("/tickets");
  revalidatePath(`/tickets/${ticketId}`);

  return { success: true, message: "Ticket closed successfully" };
}

// Register user to DB
export async function registerUserIfNeeded(user: {
  id: string;
  email: string | null;
  given_name?: string | null;
  family_name?: string | null;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email ?? "" },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user.email ?? "",
        name:
          [user.given_name, user.family_name].filter(Boolean).join(" ") || null,
      },
    });
  }
}
