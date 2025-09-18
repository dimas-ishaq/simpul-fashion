import { prisma } from "@/lib/prisma";

export async function productSeeder(sellerId: string, categoryId: string) {
  try {
    await prisma.product.create({
      data: {
        name: "Dress",
        description: "Lorem ipsum dolor sit amet",
        stock: 100,
        price: 100000,
        categories: {
          create: {
            category: {
              connect: { id: categoryId },
            },
          },
        },
      },
    });
    console.log("✅ Produk berhasil terbuat");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`Terjadi kesalahan ${error.message}`);
  }
}
