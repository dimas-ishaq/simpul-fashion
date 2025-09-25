import React from "react";
import ProductImages from "./ProductImages";
import { formatRupiah } from "@/lib/helper";
import {
  MessageCircle,
  Package2,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import StoreInfo from "./StoreInfo";
import Review from "./Review";
import ButtonAddToCart from "./ButtonAddToCart";
import ButtonBuyNow from "./ButtonBuyNow";

interface ProductPageParams {
  productId: string;
}

async function getProductById(productId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products?productId=${productId}`
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<ProductPageParams>;
}) {
  const { productId } = await params;
  const uuid = productId.slice(0, 36);
  const product = await getProductById(uuid);
  const { description } = await product;
  const safeDescription = DOMPurify.sanitize(description);

  return (
    <div className="grid grid-cols-2 items-start px-8">
      <div className="flex flex-col space-y-8 ">
        <ProductImages images={product.images} />
        <StoreInfo store={product.store} />
        <Review />
      </div>
      <div className="flex flex-col items-start space-y-8">
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="text-3xl font-bold  text-red-500 ">
            {formatRupiah(product.price)}
          </div>
          <div>
            <div className="text-base flex space-x-2">
              <Package2 />
              <span className="font-light">{product.stock} Stok tersisa</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size={"lg"} variant={"outline"}>
            <MessageCircle />
            Chat
          </Button>
          <ButtonBuyNow productId={product.id} />
          <ButtonAddToCart productId={product.id} />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold">Deskripsi:</div>
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:text-neutral-50"
            dangerouslySetInnerHTML={{ __html: safeDescription }}
          ></div>
        </div>
      </div>
    </div>
  );
}
