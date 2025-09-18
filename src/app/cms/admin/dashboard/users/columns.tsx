"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonEditUser from "@/app/cms/admin/dashboard/users/ButtonEditUser";
import ButtonDeleteUser from "@/app/cms/admin/dashboard/users/ButtonDeleteUser";
import ButtonBanUser from "@/app/cms/admin/dashboard/users/ButtonBanUser";
import { ArrowUpDown, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getDateMonthYear } from "@/lib/helper";

export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  userRoles: string[];
  createdAt: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const imageUrl = row.original.image || "/assets/images/user/profile.png";
      return (
        <div className="flex items-center gap-2">
          <Image
            src={imageUrl}
            alt={row.original.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <span className="font-medium capitalize">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "userRoles",
    header: "Role",
    cell: ({ row }) => {
      const roleColors: Record<string, string> = {
        buyer: "bg-blue-100 text-blue-800",
        seller: "bg-green-100 text-green-800",
        admin: "bg-purple-100 text-purple-800",
      };

      return (
        <div className="flex space-x-1">
          {row.original.userRoles.map((item, index) => {
            return (
              <Badge
                key={index}
                className={roleColors[item] || "bg-gray-800 text-white"}
              >
                <span>{item}</span>
              </Badge>
            );
          })}
        </div>
      );
    },
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
          <PopoverTrigger asChild>
            <Button variant={"ghost"}>
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="grid grid-rows-3 max-w-24 gap-y-2 items-center"
            side="left"
          >
            <ButtonEditUser data={row.original} />
            <ButtonDeleteUser id={row.original.id} />
            <ButtonBanUser id={row.original.id} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
