/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { RoleName } from "@/generated/prisma";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");

    if (!storeId) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Query parameter `storeId` must be included",
        },
        { status: 400 }
      );
    }

    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return NextResponse.json({
        status: "Failed",
        message: "Toko tidak ditemukan",
      });
    }

    await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        isActive: true,
        isVerified: true,
        user: {
          update: {
            userRoles: {
              create: {
                role: {
                  connect: {
                    name: RoleName.seller,
                  },
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(
      {
        status: "Success",
        message: "Toko berhasil diverifikasi",
      },
      { status: 200 }
    );
  } catch (error:any) {
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error.message}`,
      },
      { status: 500 }
    );
  }
}
