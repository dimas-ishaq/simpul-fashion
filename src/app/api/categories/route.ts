import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    if (categories.length < 1) {
      return NextResponse.json(
        {
          status: "Success",
          data: [],
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        status: "Success",
        data: categories,
      },
      { status: 200 }
    );
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

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();
    await prisma.category.upsert({
      where: {
        name: name,
      },
      update: {},
      create: {
        name,
        description,
      },
    });
    return NextResponse.json(
      {
        status: "Success",
        message: `Kategori ${name} berhasil ditambahkan`,
      },
      { status: 201 }
    );
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
