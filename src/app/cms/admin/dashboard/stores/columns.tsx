"use client";

import { StoreTableTypes } from "@/types/Store";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { BadgeAlert, BadgeCheckIcon, EllipsisVertical } from "lucide-react";
import { getDateMonthYear } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonVerify from "./ButtonVerifyStore";
import ButtonDetailStore from "./ButtonDetailStore";

export const columns: ColumnDef<StoreTableTypes>[] = [
  {
    accessorKey: "name",
    header: "Nama Toko",
  },
  {
    accessorKey: "ownerName",
    header: "Pemilik",
    cell: ({ row }) => {
      const { name } = row.original.user;
      return name;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const { isActive } = row.original;
      return (
        <Badge
          variant="secondary"
          className={
            isActive
              ? "bg-green-500 text-white dark:bg-green-600"
              : "bg-amber-500 text-white dark:bg-amber-600"
          }
        >
          {isActive && (
            <>
              <BadgeCheckIcon />
              <span>Aktif</span>
            </>
          )}

          {!isActive && (
            <>
              <BadgeAlert />
              <span>Nonaktif</span>
            </>
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: "Verifikasi",
    cell: ({ row }) => {
      const { isVerified } = row.original;
      return (
        <Badge
          variant={isVerified ? "secondary" : "destructive"}
          className={
            isVerified ? "bg-blue-500 text-white dark:bg-blue-600" : ""
          }
        >
          {isVerified && (
            <>
              <BadgeCheckIcon />
              <span>Verified</span>
            </>
          )}

          {!isVerified && (
            <>
              <BadgeAlert />
              <span>Unverified</span>
            </>
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pendaftaran",
    cell: ({ row }) => {
      return <span>{getDateMonthYear({ date: row.original.createdAt })}</span>;
    },
  },
  {
    accessorKey: "totalProducts",
    header: "Jumlah Produk",
    cell: ({ row }) => {
      const { products } = row.original._count;
      return products;
    },
  },
  {
    accessorKey: "totalOrders",
    header: "Jumlah Pesanan",
    cell: ({ row }) => {
      const { orders } = row.original._count;
      return orders;
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            side="left"
            className="flex items-center justify-center m-0 w-fit"
          >
            <div className="grid gap-2 items-center justify-center">
              {!row.original.isVerified && <ButtonVerify id={id} />}
              <ButtonDetailStore />
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
