import { DataTable } from "./data-table";
import { columns } from "./columns";
import { User } from "./columns"; // Assuming User type is exported from columns.ts
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
async function getUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/users"); // Use a full URL if running on a server
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const { data } = await res.json();
    const users: User[] = data;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    // Return an empty array or handle the error gracefully
    return [];
  }
}

export default async function Pengguna() {
  const users = await getUsers();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Pengguna</CardTitle>
          <CardDescription>
            Anda bisa menambah, merubah, mengedit dan ban pengguna
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
