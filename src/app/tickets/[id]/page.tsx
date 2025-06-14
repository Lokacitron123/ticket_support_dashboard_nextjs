import { getSingleTicket } from "@/actions/actions";
import { CloseTicketBtn } from "@/components/CloseTicketBtn";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TicketPage({ params }: Props) {
  const { id } = await params;
  const response = await getSingleTicket(id);

  if (!response.success) {
    return <div>Error: {response.error}</div>;
  }
  const { ticket } = response;
  return (
    <div className='bg-white rounded-lg shadow border border-gray-200 p-10 space-y-6'>
      <h1 className='text-3xl font-bold text-blue-600'>{ticket.subject}</h1>

      <div className='text-gray-700'>
        <h2 className='text-lg font-semibold mb-2'>Description</h2>
        <p>{ticket.description}</p>
      </div>

      <div className='text-gray-700'>
        <h2 className='text-lg font-semibold mb-2'>Priority</h2>
        <p className={getPriorityClass(ticket.priority)}>{ticket.priority}</p>
      </div>

      <div className='text-gray-700'>
        <h2 className='text-lg font-semibold mb-2'>Created At</h2>
        <p>{new Date(ticket.createdAt).toLocaleString()}</p>
      </div>

      <Link
        href='/tickets'
        className='w-full inline-block bg-blue-600 text-white px-3 py-3 rounded hover:bg-blue-700 transition'
      >
        <BiArrowBack className='inline-block' /> <span> Back to Tickets</span>
      </Link>

      {ticket.status !== "Closed" && (
        <CloseTicketBtn
          ticketId={ticket.id}
          isClosed={ticket.status === "Closed"}
        />
      )}
    </div>
  );
}
