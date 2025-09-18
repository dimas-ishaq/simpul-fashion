import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getStores() {
  try {
    const response = await fetch(`${process.env.NEXTJS_APP_URL}/api/stores`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default async function StoresDashboard() {
  const stores = await getStores();
  return (
    <div className="p-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Data Toko</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <DataTable columns={columns} data={stores} />
        </CardContent>
      </Card>
    </div>
  );
}
