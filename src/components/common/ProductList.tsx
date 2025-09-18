import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";
import { ProductTypes } from "@/types/Product";
import { MoveRight } from "lucide-react";
import ProductItem from "./ProductItem";
export default function ProductList({
  products,
}: {
  products: ProductTypes[];
}) {
  return (
    <div className="w-full flex flex-col mb-8 group px-16">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">
          Produk Pilihan untuk Anda
        </h2>
        <Link
          href={"#"}
          className="font-semibold text-sm flex items-center space-x-1"
        >
          <span>Lihat Semua</span>
          <MoveRight />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="basis-1/6 pl-4 group/card">
              <ProductItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute  opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CarouselNext className="absolute  opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Carousel>
    </div>
  );
}
