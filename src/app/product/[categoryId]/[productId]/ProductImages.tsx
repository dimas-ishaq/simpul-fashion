"use client";

import { ProductImageTypes } from "@/types/Product";
import React, { useState } from "react";
import Image from "next/image";

export default function ProductImages({
  images,
}: {
  images: ProductImageTypes[];
}) {
  const [image, setImage] = useState<null | ProductImageTypes>();
  const handleChangeImage = ({ image }: { image: ProductImageTypes }) => {
    setImage(image);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={image?.url ?? images[0].url}
        height={500}
        width={500}
        className="aspect-1/1 object-cover "
        alt="product-image"
      />
      <div className="flex space-x-2 items-start ">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => handleChangeImage({ image: img })}
            className={
              img.id == image?.id
                ? "border-2 border-neutral-500 dark:border-neutral-50 rounded-sm"
                : ""
            }
          >
            <Image
              src={img.url}
              height={80}
              width={80}
              alt="image-thumbnail"
              className="aspect-16/9 object-cover rounded-sm"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
