import React from "react";
import { Header } from "@/components/common/Header";
import { Toaster } from "@/components/ui/sonner";
export default function ProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header role={"buyer"} />
      <main>{children}</main>
      <Toaster />
    </>
  );
}
