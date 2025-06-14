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
  const openTickets = tickets.filter((t) => t.status !== "Closed");
  const closedTickets = tickets.filter((t) => t.status !== "Open");

  return (
    <div className='p-10 '>
      <h1 className='text-3xl font-bold text-blue-600 mb-8 text-center'>
        Support Tickets
      </h1>
      <div className='flex space-x-7 flex-col md:flex-row'>
        <div className='mt-4 w-full'>
          <h2 className='text-xl font-semibold mb-6 text-center'>
            Open Tickets
          </h2>
          {openTickets.length === 0 ? (
            <p className='text-center text-gray-600'>No Tickets Yet</p>
          ) : (
            <ul className='space-y-4 min-w-[350px]'>
              {openTickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </ul>
          )}
        </div>
        <div className='mt-4 w-full'>
          <h2 className='text-xl font-semibold mb-6 text-center'>
            Closed Tickets
          </h2>
          {closedTickets.length === 0 ? (
            <p className='text-center text-gray-600'>No Tickets Yet</p>
          ) : (
            <ul className='space-y-4 min-w-[350px]'>
              {closedTickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
