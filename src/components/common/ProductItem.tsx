import { formatRupiah } from "@/lib/helper";
import { Tag, Package, BadgeCheckIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { ProductTypesResponse } from "@/types/Product";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProductItem({
  product,
}: {
  product: ProductTypesResponse;
}) {
  const productCategories = product.categories.flatMap((category) =>
    Array.isArray(category.category)
      ? category.category.map((item) => item.name)
      : [category.category.name]
  );

  return (
    <Link
      href={`/product/${productCategories[0]}/${product.id}-${product.slug}`}
    >
      <Card className="pt-0 shadow-sm duration-300 ease-in-out delay-150 group-hover/card:-translate-y-1 ">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg aspect-1/1 object-cover"
        />
        <CardContent className="m-0 px-2">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex space-x-1 items-center text-xs">
              <Badge
                variant="secondary"
                className="bg-green-500 text-white dark:bg-green-600 rounded-full p-0.5"
              >
                <BadgeCheckIcon />
              </Badge>
              <span className=" font-semibold capitalize">
                {product.store.name}
              </span>
            </div>
            <div className="line-clamp-1 capitalize text-sm">
              {product.name}
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold bg-red-500 rounded-lg w-fit px-2 text-white">
              <Tag width={12} />
              <span className="text-sm">{formatRupiah(product.price)}</span>
            </div>

            <div className="text-xs flex items-center space-x-2">
              <div>⭐&nbsp;5.0</div>
              <div className="flex space-x-1 items-center dark:text-neutral-50">
                <Package width={16} />
                <span>{product._count.orderItem} Terjual</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
