import type { Metadata } from "next";

import "../globals.css";
import { Header } from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Simpul Fashion Ecommerce",
  description: "Find Your Style",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Header role={"buyer"} />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
