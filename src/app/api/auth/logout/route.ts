import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookie = (await cookies()).get("session");
  if (cookie) {
    (await cookies()).delete("session");
  }

  return NextResponse.json(
    { status: "Success", message: "Logout successful" },
    { status: 200 }
  );
}
