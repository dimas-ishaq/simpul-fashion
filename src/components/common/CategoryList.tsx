"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const categoriesData = [
  { id: 1, name: "Atasan", image: "/assets/images/categories/atasan.png" },
  { id: 2, name: "Bawahan", image: "/assets/images/categories/bawahan.png" },
  { id: 3, name: "Dress", image: "/assets/images/categories/dress.png" },
  { id: 4, name: "Outwear", image: "/assets/images/categories/outwear.png" },
  { id: 5, name: "Olahraga", image: "/assets/images/categories/olahraga.png" },
  { id: 6, name: "Batik", image: "/assets/images/categories/batik.png" },
  { id: 7, name: "Jacket", image: "/assets/images/categories/jacket.png" },
  {
    id: 8,
    name: "Aksessoris",
    image: "/assets/images/categories/aksessoris.png",
  },
  { id: 9, name: "Sepatu", image: "/assets/images/categories/sepatu.png" },
  { id: 10, name: "Tas", image: "/assets/images/categories/tas.png" },
];

export const CategoryList = () => {
  return (
    <div className="w-full flex  justify-center items-center mb-8 group">
      <Carousel>
        <CarouselContent className="items-center">
          {categoriesData.map((item) => (
            <CarouselItem key={item.id} className="basis-1/9 pl-8">
              <div className="flex flex-col items-center justify-center">
                <div className="rounded-full bg-stone-300">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="aspect-1/1"
                  />
                </div>
                <div className="text-sm text-stone-500 dark:text-neutral-50">
                  {item.name}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute  opacity-0 transition-opacity duration-300 group-hover:opacity-100 " />
        <CarouselNext className="absolute  opacity-0 transition-opacity duration-300 group-hover:opacity-100 " />
      </Carousel>
    </div>
  );
};
