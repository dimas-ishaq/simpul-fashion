import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      const stores = await prisma.store.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              products: true,
              orders: true,
            },
          },
        },
      });

      return NextResponse.json({
        status: "Success",
        data: stores,
      });
    }

    const store = await prisma.store.findFirst({
      where: {
        userId,
      },
    });

    if (!store) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Toko tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "Success",
      data: store,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error}`,
      },
      { status: 500 }
    );
  }
}
