"use client";

import { Ticket } from "@/generated/prisma";
import { FaArrowUp, FaArrowDown, FaArrowsAltV } from "react-icons/fa";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  tickets: Ticket[] | undefined;
};

const columnHelper = createColumnHelper<Ticket>();

const getSortableHeader = (label: string) => {
  const SortableHeader = (header: HeaderContext<Ticket, unknown>) => {
    const column = header.column;
    return (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className='w-full pl-1 pr-2 py-1 flex items-center justify-between text-left font-medium  rounded'
      >
        {label}
        {column.getIsSorted() === "asc" && (
          <FaArrowUp className='ml-2 h-4 w-4' />
        )}
        {column.getIsSorted() === "desc" && (
          <FaArrowDown className='ml-2 h-4 w-4' />
        )}
        {column.getIsSorted() == null && (
          <FaArrowsAltV className='ml-2 h-4 w-4' />
        )}
      </button>
    );
  };

  SortableHeader.displayName = `SortableHeader(${label})`;
  return SortableHeader;
};

export const columns = [
  columnHelper.accessor("id", {
    header: getSortableHeader("ID"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subject", {
    header: getSortableHeader("Subject"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("priority", {
    header: getSortableHeader("Priority"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: getSortableHeader("Status"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: getSortableHeader("Created"),
    cell: (info) =>
      info.getValue() instanceof Date
        ? info.getValue().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : info.getValue(),
  }),
];

export const TicketsTable = ({ tickets }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "id",
      desc: false,
    },
  ]);

  const router = useRouter();
  const table = useReactTable({
    data: tickets ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className='mt-6 rounded-lg overflow-hidden border border-border'>
      <table className='border'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='border p-4 text-left'>
                  <div className='flex gap-3'>
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </div>
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
