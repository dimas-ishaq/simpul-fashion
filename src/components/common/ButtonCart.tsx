"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import CartList from "./CartList";

async function getCartItem() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default function ButtonCart() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItem,
  });

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative">
          {isSuccess && (
            <Badge className="h-2 w-2 p-1.5 rounded-full text-xs absolute -top-1 -right-1">
              {data._count.cartItem}
            </Badge>
          )}
          <Button variant="secondary" asChild>
            <Link href={"/cart"}>
              <ShoppingCart />
            </Link>
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="mt-4.5 flex flex-col w-sm">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CartList cartItem={data.cartItem} />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
