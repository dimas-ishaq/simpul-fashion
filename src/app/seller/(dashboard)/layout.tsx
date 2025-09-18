import "@/app/globals.css";
import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarApp from "@/components/common/SidebarApp";
import { Separator } from "@radix-ui/react-separator";
import { Toaster } from "sonner";
import BreadcrumbSeller from "./BreadcrumbSeller";
import { ModeToggle } from "@/components/common/ModeToggle";

export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarApp user={null} role="seller" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 shadow-lg dark:border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbSeller />
          </div>
          <div className="w-full  flex justify-end px-8">
            <ModeToggle />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
      <Toaster position="top-right" expand={true} />
    </SidebarProvider>
  );
}
