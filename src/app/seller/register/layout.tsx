import React from "react";
import "@/app/globals.css";

import { Toaster } from "@/components/ui/sonner";
export default function SellerRegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
      <Toaster position="top-right" />
    </>
  );
}
