"use client";

import { Ticket } from "@/generated/prisma";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Columns } from "./Column";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  tickets: Ticket[] | undefined;
};

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

export const TicketsTable = ({ tickets }: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const router = useRouter();
  const table = useReactTable({
    data: tickets ?? [],
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className='mt-6 rounded-lg overflow-hidden border border-border'>
      <table className='border'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='border p-4 text-left'>
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
            <tr
              key={row.id}
              className='cursor-pointer  hover:ring'
              onClick={() => {
                router.push(`/dashboard/${row.original.id}`);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-4'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
