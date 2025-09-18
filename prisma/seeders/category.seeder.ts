import { prisma } from "@/lib/prisma";
import { CategoryTypes } from "@/types/Category";
import { fakerID_ID } from "@faker-js/faker";
export async function categorySeeder(): Promise<CategoryTypes | undefined> {
  try {
    const category = await prisma.category.upsert({
      where: {
        name: "dress",
      },
      update: {},
      create: {
        name: "dress",
      },
    });
    console.log("✅ category berhasil dibuat");
    return category;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`Terjadi kesalahan ${error.message}`);
  }
}

export async function bulkCategorySeeder() {
  const categoryToCreate = Array.from({ length: 20 });

  for (const i of categoryToCreate) {
    try {
      const categoryName = fakerID_ID.commerce.department();
      await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: {
          name: categoryName,
        },
      });
      console.log(`Kategori ${categoryName} berhasil ditambahkan`);
    } catch (error) {
      console.error(`Terjadi kesalahan ${error}`);
    }
  }
}
