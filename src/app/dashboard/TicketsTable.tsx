"use client";

import { Ticket } from "@/generated/prisma";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Columns } from "./Column";

type Props = {
  tickets: Ticket[] | undefined;
};

export const TicketsTable = ({ tickets }: Props) => {
  const table = useReactTable({
    data: tickets ?? [],
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='min-w-full border border-gray-300'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className=''>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border p-2 text-left'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className='border-b '>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='p-2'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
