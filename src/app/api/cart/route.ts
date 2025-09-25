import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jose";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const cartItem = await request.json();

    if (!session?.userId) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    if (!cartItem.productId || !cartItem.quantity) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "productId dan quantity harus di sertakan",
        },
        { status: 400 }
      );
    }

    // cek stock produk
    const product = await prisma.product.findFirst({
      where: {
        id: cartItem.productId,
      },
      select: {
        stock: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { status: "Failed", message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    if (cartItem.quantity > product.stock) {
      return NextResponse.json(
        {
          status: "Failed",
          message: `Permintaan melebihi total stok (${product.stock}).`,
        },
        { status: 400 }
      );
    }

    const userId = session.userId;

    // check cart
    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      select: {
        id: true,
      },
    });

    // cek quantity yang sudah ada
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: cartItem.productId,
        },
      },
      select: { quantity: true },
    });

    const currentCartQuantity = existingCartItem?.quantity || 0;
    const totalNewQuantity = currentCartQuantity + cartItem.quantity;

    if (totalNewQuantity > product.stock) {
      return NextResponse.json(
        {
          status: "Failed",
          message: `Permintaan anda melebihi stock yang tersedia. Total produk ini dikeranjang anda (${product.stock}).`,
        },
        { status: 400 }
      );
    }

    // tambah/update item di cart
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: cartItem.productId,
        },
      },
      create: {
        cartId: cart.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      },
      update: {
        quantity: { increment: cartItem.quantity },
      },
    });

    return NextResponse.json(
      {
        status: "Succes",
        message: "Produk berhasil ditambahkan ke keranjang",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
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
    const userId = session.userId;
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      select: {
        cartItem: {
          include: {
            product: {
              include: {
                images: true,
                categories: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            cartItem: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (cart?.cartItem && cart.cartItem.length > 0) {
      return NextResponse.json({
        status: "Success",
        data: cart,
      });
    }

    return NextResponse.json({
      status: "Success",
      data: [],
    });
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
