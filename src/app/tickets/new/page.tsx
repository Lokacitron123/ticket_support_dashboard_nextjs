import { redirect } from "next/navigation";
import { NewTicketForm } from "./NewTicketForm";
import { getAuthStatus } from "@/lib/auth";

export default async function NewTicketPage() {
  const { isAuthed } = await getAuthStatus();

  if (!isAuthed) {
    return redirect("/login");
  }

  return (
    <div>
      <NewTicketForm />
    </div>
  );
}
