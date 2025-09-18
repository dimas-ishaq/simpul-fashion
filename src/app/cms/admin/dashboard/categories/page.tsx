import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getCategories() {
  try {
    const categories = await fetch("http://localhost:3000/api/categories");
    const { data } = await categories.json();
    return data;
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Kategori</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <DataTable columns={columns} data={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
