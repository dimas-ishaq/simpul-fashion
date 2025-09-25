"use client";

import { Button } from "@/components/ui/button";
import { CartItemInput } from "@/types/Cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import React from "react";
import { toast } from "sonner";

async function addToChart(cartItem: CartItemInput) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      }
    );

    const { message } = await response.json();
    if (response.ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return null;
  }
}

export default function ButtonAddToCart({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: addToChart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <Button
      size={"lg"}
      variant={"secondary"}
      onClick={() => mutation.mutate({ productId, quantity: 1 })}
    >
      <ShoppingCart />
      Tambah ke Keranjang
    </Button>
  );
}
