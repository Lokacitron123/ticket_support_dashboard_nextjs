import { Ticket } from "@/generated/prisma";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";

type Props = {
  ticket: Ticket;
};

export const TicketItem = ({ ticket }: Props) => {
  const isClosed = ticket.status === "Closed";

  return (
    <div
      key={ticket.id}
      className={`w-full flex justify-between gap-3 bg-white rounded-lg shadow border border-gray-200 p-8 ${
        isClosed ? "opacity-50" : ""
      }`}
    >
      {/* Left Side */}
      <div className=''>
        <h2 className='text-xl font-semibold text-blue-600'>
          {ticket.subject}
        </h2>
      </div>
      {/* Right Side */}
      <div className='text-center space-y-2'>
        <div className='text-sm text-gray-500'>
          Priority:{" "}
          <span className={getPriorityClass(ticket.priority)}>
            {ticket.priority}
          </span>
        </div>
        <Link
          href={`/tickets/${ticket.id}`}
          className={`inline-block mt-2 text-sm px-3 py-1 rounded transition text-center ${
            isClosed
              ? "bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none"
              : "bg-blue-600 text-white hover:bg-blue-700 "
          }`}
        >
          View Ticket
        </Link>
      </div>
    </div>
  );
};
