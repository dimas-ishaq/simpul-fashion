import roleSeeder from "./seeders/role.seeder";
import adminSeeder from "./seeders/admin.seeder";
import {
  sellerSeeder,
  buyerSeeder,
  bulkBuyerSeeder,
} from "./seeders/user.seeder";
import { productSeeder } from "./seeders/product.seeder";
import { categorySeeder, bulkCategorySeeder } from "./seeders/category.seeder";
import { prisma } from "@/lib/prisma";

async function main() {
  await roleSeeder();
  await adminSeeder();
  const category = await categorySeeder();
  await bulkCategorySeeder();
  const seller = await sellerSeeder();
  const buyer = await buyerSeeder();
  await bulkBuyerSeeder();

  // if (seller?.id && category?.id) {
  //   await productSeeder(seller?.id, category?.id);
  // }
}

main()
  .then(() => {
    console.log("🎉 Semua seeder selesai");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error saat seeding:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
