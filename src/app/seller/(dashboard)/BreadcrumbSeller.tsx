"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function BreadcrumbSeller() {
  const data = [
    {
      name: "Dashboard",
      url: "/seller/dashboard",
    },
    {
      name: "Produk",
      url: "/seller/products",
    },
    {
      name: "Pesanan",
      url: "/seller/orders",
    },
    {
      name: "Promosi",
      url: "/seller/promotion",
    },
    {
      name: "Ulasan & Rating",
      url: "/seller/reviews-ratings",
    },
    {
      name: "Bantuan",
      url: "/seller/helpdesk",
    },
  ];

  const pathname = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) => {
          if (item.url === pathname) {
            return (
              <div className="flex" key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.url}>{item.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
