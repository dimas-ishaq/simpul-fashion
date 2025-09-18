import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductDetail from "./ProductDetail";
import { ProductTableTypes } from "@/types/Product";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ButtonDetailProduct({
  product,
}: {
  product: ProductTableTypes;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Search />
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75vw] max-h-[80vh] flex flex-col">
        <ScrollArea className="w-full h-screen overflow-y-auto m-0 p-0">
          <div className="p-4">
            <DialogHeader>
              <DialogTitle>Detail Produk</DialogTitle>
              <DialogDescription>
                Lihat informasi lengkap mengenai produk, termasuk deskripsi,
                status, harga, dan kategori yang tersedia.
              </DialogDescription>
            </DialogHeader>
            <ProductDetail product={product} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
