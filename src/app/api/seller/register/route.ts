import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/lib/helper";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jose";

export async function POST(request: NextRequest) {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const { name, description, address } = await request.json();
    const slug = generateSlug(name);

    if (!session?.userId) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    // cek user

    const user = await prisma.user.findFirst({
      where: {
        id: session.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User not found",
        },
        { status: 404 }
      );
    }

    //  cek store
    const userId = session.userId;
    const isStoreExist = await prisma.store.findFirst({
      where: {
        OR: [
          {
            userId,
            name,
          },
        ],
      },
    });

    if (isStoreExist) {
      if (isStoreExist.userId === userId) {
        return NextResponse.json(
          {
            status: "Failed",
            message:
              "Anda sudah memiliki toko. Pengguna hanya bisa memiliki satu toko.",
          },
          { status: 409 }
        );
      }
      if (isStoreExist.name === name) {
        return NextResponse.json(
          {
            status: "Failed",
            message: "Nama toko sudah digunakan. Silakan pilih nama lain.",
          },
          { status: 409 }
        );
      }
    }

    const store = await prisma.store.create({
      data: {
        name,
        description,
        address,
        slug,
        isActive: false,
        userId,
      },
    });

    return NextResponse.json({
      status: "Success",
      message: "Pendaftaran berhasil",
      data: store,
    });
  } catch (error) {
    console.log(`terjadi kesalhahan ${error}`);
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "cek",
  });
}
