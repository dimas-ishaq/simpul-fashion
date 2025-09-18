import ButtonAddProduct from "./ButtonAddProduct";
import React from "react";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jose";
import { ProductTypes } from "@/types/Product";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CategoryTypes } from "@/types/Category";

async function getProductBySellerId(session?: string) {
  if (!session) return [];

  try {
    const response = await fetch("http://localhost:3000/api/products", {
      headers: {
        Cookie: `session=${session}`, // forward cookie
      },
    });
    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error(`Terjadi kesalahan ${(error as Error).message}`);
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch("http://localhost:3000/api/categories");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default async function ProductPage() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    return <div>Pengguna tidak terautentikasi</div>;
  }

  const user = await decrypt(sessionCookie);

  if (!user?.roles.includes("seller")) {
    return <div>Anda tidak memiliki akses ke resource ini</div>;
  }

  const products: ProductTypes[] = await getProductBySellerId(sessionCookie);
  const categories: CategoryTypes[] = await getCategories();

  return (
    <div className="p-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Data Produk</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <ButtonAddProduct categories={categories} />
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </div>
  );
}
