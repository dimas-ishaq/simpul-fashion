"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ProductTableTypes } from "@/types/Product";
import Image from "next/image";
import { getDateMonthYear } from "@/lib/helper";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, BadgeX, EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ButtonUpdateProduct from "./ButtonUpdateProduct";
import ButtonDetailProduct from "./ButtonDetailProduct";
import ButtonDeleteProduct from "./ButtonDeleteProduct";
import { PublicationStatusBadge } from "./PublicationStatusBadge";

export const columns: ColumnDef<ProductTableTypes>[] = [
  {
    accessorKey: "name",
    header: "Nama Produk",
    cell: ({ row }) => {
      const { images, name } = row.original;
      return (
        <div className="flex items-center gap-4">
          {images && images.length > 0 && (
            <Image
              src={images[0].url}
              alt="product-image"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const { isPublished } = row.original;
      return <PublicationStatusBadge isPublished={isPublished} />;
    },
  },
  {
    accessorKey: "stock",
    header: "Stok",
  },
  {
    accessorKey: "price",
    header: "Harga",
  },

  {
    accessorKey: "createdAt",
    header: "Tanggal dibuat",
    cell: ({ row }) => {
      return getDateMonthYear({ date: row.original.createdAt });
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const productId = row.original.id;
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
            className="w-fit flex flex-col items-center space-y-2"
          >
            <ButtonDetailProduct product={row.original} />
            <ButtonUpdateProduct product={row.original} />
            <ButtonDeleteProduct productId={productId} />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
