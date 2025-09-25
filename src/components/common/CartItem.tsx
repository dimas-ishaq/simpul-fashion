import React from "react";
import Image from "next/image";
import { CartItemSingleResponse } from "@/types/Cart";
import Link from "next/link";
export default function CartItem({ item }: CartItemSingleResponse) {
  const { quantity, product } = item;
  const { images, categories } = product;
  const productCategory = Array.isArray(categories[0].category)
    ? categories[0].category[0]?.name
    : categories[0].category?.name;

  return (
    <Link
      href={`/product/${productCategory}
        /${product.id}-${product.slug}`}
    >
      <div className="flex border-b py-2 space-x-2 w-full">
        <Image
          src={images[0].url}
          alt="product-thumbnail"
          width={48}
          height={48}
          className="aspect-1/1 object-cover rounded-sm"
        />
        <div>
          <div className="truncate">{product.name}</div>
          <div className="text-sm">Quantity: {quantity}</div>
        </div>
        <div className="text-sm">
          <span>{quantity}</span>x <span>{product.price}</span>
        </div>
      </div>
    </Link>
  );
}
