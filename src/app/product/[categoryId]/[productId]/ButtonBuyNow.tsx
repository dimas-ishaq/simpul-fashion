"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function ButtonBuyNow({ productId }: { productId: string }) {
  const handleBuyNow = () => {};
  return (
    <Button size={"lg"}>
      <ShoppingBag />
      Beli Sekarang
    </Button>
  );
}
