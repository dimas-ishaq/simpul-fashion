import React from "react";
import { ProductTableTypes } from "@/types/Product";
import ProductImageCarousel from "./ProductImageCarousel";
import { formatRupiah } from "@/lib/helper";
import { PublicationStatusBadge } from "./PublicationStatusBadge";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";

export default function ProductDetail({
  product,
}: {
  product: ProductTableTypes;
}) {
  const cleanDescription = DOMPurify.sanitize(product.description);
  return (
    <div className="grid grid-cols-2 items-start mt-4 ">
      <div className="flex flex-col mt-4">
        <ProductImageCarousel images={product.images} />
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
            Nama Produk :
          </div>
          <div className="text-stone-800 text-xl font-semibold dark:text-neutral-50">
            {product.name}
          </div>
        </div>
        <div className="grid grid-cols-3 items-start">
          <div>
            <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
              Harga Produk :
            </div>
            <div className="text-stone-800 text-lg font-semibold dark:text-neutral-50">
              {formatRupiah(product.price)}
            </div>
          </div>
          <div>
            <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
              Status Produk :
            </div>
            <div className="text-stone-800 text-lg font-semibold">
              <PublicationStatusBadge isPublished={product.isPublished} />
            </div>
          </div>
          <div>
            <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
              Stok Produk :
            </div>
            <div className="text-stone-800 text-lg font-semibold dark:text-neutral-50">
              {product.stock}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
            Kategori Produk :
          </div>
          <div className=" flex space-x-2">
            {product.categories.flatMap((item) => {
              const categories = Array.isArray(item.category)
                ? item.category
                : [item.category]; // kalau object tunggal, jadikan array

              return categories.map((category) => (
                <Badge key={category.id} variant={"outline"}>
                  {category.name}
                </Badge>
              ));
            })}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-stone-600 text-xs font-light dark:text-neutral-50">
            Deskripsi Produk :
          </div>
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:text-neutral-50"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        </div>
      </div>
    </div>
  );
}
