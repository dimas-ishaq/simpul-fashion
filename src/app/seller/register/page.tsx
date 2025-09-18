import React from "react";
import FormSellerRegister from "./FormSellerRegister";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jose";
import { redirect } from "next/navigation";

async function getStoreByUserId(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/stores?userId=${userId}`
    );
    const { data } = await response.json();
    console.log("Data", data);
    return data;
  } catch (error) {
    console.log(`Terjadi kesalahan ${error}`);
    return [];
  }
}

export default async function SellerRegister() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    return <div>User not authenticated</div>;
  }

  const store = await getStoreByUserId(session.userId);
  console.log("Store", store);

  if (!store || store.length === 0) {
    return (
      <div>
        <div className="max-w-md mx-auto flex min-h-screen justofy-center items-center">
          <FormSellerRegister />
        </div>
      </div>
    );
  }
  if (!store.isVerified) {
    return redirect("/seller/register/pending");
  }
}
