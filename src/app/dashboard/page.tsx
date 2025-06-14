import { getTickets } from "@/actions/actions";
import { getAuthStatus } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TicketsTable } from "./TicketsTable";

export default async function DashboardPage() {
  const { isAuthed, admin } = await getAuthStatus();

  const response = await getTickets();

  if (!response.success) {
  }

  if (!isAuthed || !admin) {
    redirect("/");
  }
  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        {response.success && <TicketsTable tickets={response.tickets} />}
      </div>
    </div>
  );
}
