"use client";
import React, { useState } from "react";
import AddProductForm from "./AddProductForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryTypes } from "@/types/Category";

export default function ButtonAddProduct({
  categories,
}: {
  categories: CategoryTypes[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PackagePlus />
          Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75vw] max-h-[80vh] flex flex-col">
        <ScrollArea className="w-full h-screen overflow-y-auto m-0 p-0">
          <div className="p-4">
            <DialogHeader>
              <DialogTitle>Tambah Produk</DialogTitle>
              <DialogDescription>
                Tambahkan produk baru ke toko Anda dengan mengisi informasi
                lengkap seperti nama, harga, deskripsi, dan gambar produk.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm
              categories={categories}
              onFormSubmit={() => setOpen(false)}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
