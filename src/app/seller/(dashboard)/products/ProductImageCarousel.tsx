import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductImageTypes } from "@/types/Product";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductImageCarousel({
  images,
}: {
  images: ProductImageTypes[];
}) {
  return (
    <Carousel
      className="w-full max-w-sm"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image) => {
          return (
            <CarouselItem key={image.id}>
              <Card>
                <CardContent className="flex aspect-4/3 object-cover items-center justify-center p-6">
                  <Image
                    src={image.url}
                    width={360}
                    height={360}
                    alt="product-image"
                    className="rounded-sm"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
