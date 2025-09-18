import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jose";
import { generateSlug } from "@/lib/helper";

export async function GET() {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    let products;

    // Logika kondisional:
    // 1. Jika ada sesi dan userId, ini adalah permintaan dari seller
    if (session?.userId) {
      const sellerId = session.userId;
      products = await prisma.product.findMany({
        where: {
          store: {
            userId: sellerId,
          },
          // Hanya tampilkan produk yang belum dihapus
          deletedAt: null,
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          images: true,
        },
      });
    } else {
      // 2. Jika tidak ada sesi, ini adalah permintaan dari user publik
      products = await prisma.product.findMany({
        where: {
          // Tampilkan hanya produk yang sudah dipublikasikan dan belum dihapus
          isPublished: true,
          deletedAt: null,
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          images: true,
        },
      });
    }

    // Response dengan data produk yang sudah difilter
    return NextResponse.json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    console.error(`Terjadi kesalahan fetch product ${error}`);
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
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }
    const sellerId = session.userId;
    const formData = await request.formData();

    // debug
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const name = formData.get("name") as string;
    const stock = formData.get("stock") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const categories = JSON.parse(formData.get("categories") as string);

    const images: string[] = [];

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/products/images"
    );

    await mkdir(uploadDir, { recursive: true }); // buat folder kalau belum ada

    const files = formData.getAll("images") as File[];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = Date.now() + "-" + file.name;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);

      images.push(`/uploads/products/images/${filename}`);
    }
    console.log("Categories", typeof categories);

    const store = await prisma.store.findFirst({
      where: {
        userId: sellerId,
      },
    });

    if (!store) {
      return NextResponse.json({
        status: "Failed",
        message: "Data toko tidak ditemukan",
      });
    }

    const slug = generateSlug(name);
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        stock: Number(stock),
        price: Number(price),
        storeId: store.id,
        description,
        categories: {
          create: categories.map((categoryId: string) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
        images: {
          createMany: {
            data: images.map((url: string) => ({ url })),
          },
        },
      },
    });
    console.log("Product", product);
    return NextResponse.json(
      {
        status: "Success",
        message: "Produk berhasil ditambahkan",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }
    const sellerId = session.userId;
    const { productId } = await request.json();

    const product = await prisma.product.update({
      where: {
        id: productId,
        store: {
          userId: sellerId,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Produk tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "Success",
        message: `Produk ${product.name} berhasil dihapus`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Terjadi kesalahan ${error}`);
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Ambil session
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.json(
        { status: "Failed", message: "User not authenticated" },
        { status: 401 }
      );
    }

    const sellerId = session.userId;
    const formData = await request.formData();

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);

      // Jika value adalah file, tampilkan info file
      if (value instanceof File) {
        console.log(
          `File name: ${value.name}, size: ${value.size} bytes, type: ${value.type}`
        );
      }
    }

    // Ambil productId
    const productId = formData.get("id") as string;
    if (!productId) {
      return NextResponse.json(
        { status: "Failed", message: "Product id is required" },
        { status: 400 }
      );
    }

    // Ambil field lain
    const name = formData.get("name") as string;
    const stock = formData.get("stock") as string;
    const price = formData.get("price") as string;
    const status = formData.get("status") as string;
    const description = formData.get("description") as string;
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );

    // Handle file upload (opsional)
    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/products/images"
    );
    await mkdir(uploadDir, { recursive: true });

    const files = formData.getAll("images") as File[];
    const newImages: string[] = [];

    if (files.length > 0 && files[0] instanceof File) {
      for (const file of files) {
        if (file instanceof File) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filename = Date.now() + "-" + file.name;
          const filepath = path.join(uploadDir, filename);

          await writeFile(filepath, buffer);
          newImages.push(`/uploads/products/images/${filename}`);
        }
      }
    }

    // Verifikasi store milik user
    const store = await prisma.store.findFirst({ where: { userId: sellerId } });
    if (!store) {
      return NextResponse.json(
        { status: "Failed", message: "Store not found" },
        { status: 404 }
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId, storeId: store.id },
      data: {
        name,
        stock: Number(stock),
        price: Number(price),
        isPublished: status === "true",
        description,
        categories: {
          deleteMany: {}, // hapus kategori lama
          create: categories.map((categoryId: string) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        // Tambahkan image baru hanya jika ada file
        ...(newImages.length > 0 && {
          images: { createMany: { data: newImages.map((url) => ({ url })) } },
        }),
      },
    });

    return NextResponse.json(
      {
        status: "Success",
        message: "Produk berhasil diupdate",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan saat update produk:", error);
    return NextResponse.json(
      { status: "Failed", message: `Terjadi kesalahan: ${error}` },
      { status: 500 }
    );
  }
}
