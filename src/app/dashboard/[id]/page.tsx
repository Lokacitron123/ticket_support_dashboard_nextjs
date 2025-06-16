import { getAuthStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditTicketPage({ params }: Props) {
  const { id } = params;

  const { isAuthed, admin } = await getAuthStatus();

  if (!isAuthed || !admin) {
    redirect("/");
  }

  return (
    <div>
      <h1>Edit Ticket Page - Ticket #{id}</h1>
    </div>
  );
}
