import { formatRupiah } from "@/lib/helper";
import { Tag, Package } from "lucide-react";
import React from "react";
import Image from "next/image";
import { ProductTypes } from "@/types/Product";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

export default function ProductItem({ product }: { product: ProductTypes }) {
  const productCategories = product.categories.flatMap((category) =>
    Array.isArray(category.category)
      ? category.category.map((item) => item.name)
      : [category.category.name]
  );

  return (
    <Link href={`/product/${productCategories[0]}/${product.slug}`}>
      <Card className="pt-0 shadow-sm duration-300 ease-in-out delay-150 group-hover/card:-translate-y-1 ">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg aspect-1/1 object-fit"
        />
        <CardContent className="px-4">
          <div className="mb-2 line-clamp-1 capitalize text-sm">
            {product.name}
          </div>
          <div className="flex items-center space-x-1 mb-3 text-sm font-bold bg-red-500 rounded-lg w-fit px-2 text-white">
            <Tag width={16} />
            <span className="text-xs">{formatRupiah(product.price)}</span>
          </div>
          <div className="text-xs flex items-center justify-between text-stone-600">
            <div>⭐&nbsp;5.0</div>
            <div className="flex space-x-1 items-center">
              <Package width={16} />
              <span>10.000 Terjual</span>
            </div>
          </div>
          <div>Nama Seller</div>
        </CardContent>
      </Card>
    </Link>
  );
}
