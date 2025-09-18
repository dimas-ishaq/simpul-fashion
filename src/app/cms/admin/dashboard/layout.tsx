"use client";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/store/auth.store";
import SidebarApp from "@/components/common/SidebarApp";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/common/ModeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  return (
    <SidebarProvider>
      <SidebarApp user={user} role="admin" />
      <SidebarInset>
        <header className=" shadow-lg dark:border-b flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="w-full flex items-end justify-end  px-8">
            <ModeToggle />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
      <Toaster position="top-right" expand={true} />
    </SidebarProvider>
  );
}
