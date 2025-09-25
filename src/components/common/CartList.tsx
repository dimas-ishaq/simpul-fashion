import React from "react";
import CartItem from "./CartItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartItemResponse } from "@/types/Cart";
export default function CartList({ cartItem }: CartItemResponse) {
    
  return (
    <div className="flex flex-col">
      <div className="flex items-center pb-2">
        <div className="text-sm font-semibold">Keranjang</div>
      </div>
      <ScrollArea className="h-50 ">
        <div className="flex flex-col items-start border">
          {cartItem.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-center">
        <Button asChild variant={"link"} size={"sm"}>
          <Link href={"/cart"}>Lihat semua</Link>
        </Button>
      </div>
    </div>
  );
}
