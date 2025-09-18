import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import UpdateProductForm from "./UpdateProductForm";
import { ProductTableTypes } from "@/types/Product";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ButtonUpdateProduct({
  product,
}: {
  product: ProductTableTypes;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Pencil />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75vw] max-h-[80vh] flex flex-col ">
        <ScrollArea className="w-full h-screen overflow-y-auto m-0 p-0">
          <div className="p-4">
            <DialogHeader>
              <DialogTitle>Update Produk</DialogTitle>
              <DialogDescription>
                Perbarui detail produk dengan mudah, termasuk nama, harga, stok,
                kategori, deskripsi, dan gambar, agar informasi produk selalu
                terbaru.
              </DialogDescription>
            </DialogHeader>
            <UpdateProductForm
              product={product}
              onFormSubmit={() => setOpen(false)}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
