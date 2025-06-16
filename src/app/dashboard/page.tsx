import { getTickets } from "@/actions/actions";
import { getAuthStatus } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TicketsTable } from "./TicketsTable";
import { FaTicketAlt } from "react-icons/fa";

export default async function DashboardPage() {
  const { isAuthed, admin } = await getAuthStatus();

  if (!isAuthed || !admin) {
    redirect("/");
  }

  const response = await getTickets();

  return (
    <div>
      <FaTicketAlt className='mx-auto mb-4 text-red-600' size={60} />
      <h1 className='text-4xl md:text-5xl font-bold mb-4 text-blue-600'>
        Dashboard Page
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Overview of tickets in system
      </p>
      <div className=''>
        {response.success && <TicketsTable tickets={response.tickets} />}
      </div>
    </div>
  );
}
