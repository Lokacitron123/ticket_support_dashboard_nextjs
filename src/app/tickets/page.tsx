import { getTickets } from "@/actions/actions";
import { TicketItem } from "@/components/TIcketItem";
import { getAuthStatus } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TicketsPage() {
  const { isAuthed } = await getAuthStatus();

  if (!isAuthed) {
    redirect("/login");
  }

  const response = await getTickets();

  if (!response.success) {
    return <div>Error: {response.error}</div>;
  }
  const { tickets } = response;
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold text-blue-600 mb-8 text-center'>
        Support Tickets
      </h1>
      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets Yet</p>
      ) : (
        <ul className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      )}
    </div>
  );
}
