import { Ticket } from "@/generated/prisma";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Ticket>();

export const Columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: (info) => info.getValue().toLocaleDateString(),
  }),
];
