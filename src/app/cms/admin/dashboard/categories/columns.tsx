"use client";
import { getDateMonthYear } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


export type Category = {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) => {
      return <span>{getDateMonthYear({ date: row.original.createdAt })}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      );
    },
  },
];
