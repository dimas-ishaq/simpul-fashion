import { UserTypes } from "@/types/User";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CircleUserRound,
  Store,
  ChartColumnStacked,
  ChartPie,
  ClipboardMinus,
  CircleDollarSign,
  Notebook,
  LayoutDashboard,
  ShoppingBasket,
  NotebookPen,
  CirclePercent,
  Wallet,
  Star,
  Headset,
} from "lucide-react";
import Image from "next/image";
import NavManagement from "./NavManagement";
import NavReportAnalyst from "./NavReportAnalyst";
import NavPayment from "./NavPayment";
import NavSellerManagement from "./NavSellerManagement";

interface SidebarProps {
  user: UserTypes | null;
  role: string;
}
export default function SidebarApp({ user, role }: SidebarProps) {
  if (role == "buyer") {
    return (
      <div className="w-4/12 ">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Avatar className="h-16 w-16 ">
                <AvatarImage
                  src="/assets/images/user/profile.png"
                  width={64}
                  height={64}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h5 className="text-base font-semibold line-clamp-1">
                  {user?.name}
                </h5>
                <p className="text-xs text-stone-500 line-clamp-1">
                  {user?.email}
                </p>
                <p>{user?.roles}</p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                  Kotak Masuk
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col space-y-2 items-start">
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Chat
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Ulasan
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Pesan Bantuan
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Pesanan Dikomplain
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  Pembelian
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col space-y-2 items-start">
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Menunggu Pembayaran
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"} className="hover:underline">
                        Daftar Transaksi
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <Separator />
          <CardFooter>
            <Link href={"#"} className="text-sm hover:underline">
              Keluar
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (role == "seller") {
    const data = {
      navSellerManagement: [
        {
          title: "Produk",
          icon: ShoppingBasket,
          url: "/seller/products",
        },
        {
          title: "Pesanan",
          icon: NotebookPen,
          url: "/seller/orders",
        },
        {
          title: "Promosi",
          icon: CirclePercent,
          url: "/seller/promotion",
        },
        {
          title: "Keuangan",
          icon: Wallet,
          url: "/seller/finance",
        },
        {
          title: "Ulasan & Rating",
          icon: Star,
          url: "/seller/review-rating",
        },
        {
          title: "Bantuan",
          icon: Headset,
          url: "/seller/helpdesk",
        },
      ],
    };
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex space-x-4 items-center justify-center">
            <Image
              src="/assets/logo/logo.svg"
              width={24}
              height={24}
              alt="brand-logo"
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={"/seller/dashboard"}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <NavSellerManagement items={data.navSellerManagement} />
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    );
  }

  if (role == "admin") {
    const data = {
      navManagement: [
        {
          title: "Pengguna",
          icon: CircleUserRound,
          url: "/cms/admin/dashboard/users",
        },
        {
          title: "Toko",
          icon: Store,
          url: "/cms/admin/dashboard/stores",
        },
        {
          title: "Kategori",
          icon: ChartColumnStacked,
          url: "/cms/admin/dashboard/categories",
        },
      ],
      navReportAnalyst: [
        {
          title: "Laporan",
          icon: ClipboardMinus,
          url: "#",
        },
        {
          title: "Analysis",
          icon: ChartPie,
          url: "#",
        },
      ],
      navPayment: [
        {
          title: "Komisi",
          icon: Notebook,
          url: "#",
        },
        {
          title: "Pembayaran",
          icon: CircleDollarSign,
          url: "#",
        },
      ],
    };

    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex space-x-3 items-center justify-center">
            <Image
              src="/assets/logo/logo.svg"
              width={48}
              height={48}
              alt="brand-logo"
              className="aspect-1/1"
            />
            <div className="font-bold text-lg truncate">SIMPUL FASHION</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={"/cms/admin/dashboard"}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <NavManagement items={data.navManagement} />
          <NavReportAnalyst items={data.navReportAnalyst} />
          <NavPayment items={data.navPayment} />
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    );
  }
}
