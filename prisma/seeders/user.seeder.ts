import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { RoleName } from "@/generated/prisma";
import { fakerID_ID } from "@faker-js/faker";

export async function sellerSeeder() {
  try {
    const email = "dummyseller@mail.com";
    const password = await hashPassword("Dumsel@123");
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: "Dummy Seller",
        email,
        password,
        userRoles: {
          create: [
            {
              role: {
                connect: { name: RoleName.buyer },
              },
            },
            {
              role: {
                connect: { name: RoleName.seller },
              },
            },
          ],
        },
      },
    });

    console.log("✅ Dummy seller account berhasil dibuat atau sudah ada");
    return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Terjadi error saat membuat account:", error.message);
  }
}

export async function buyerSeeder() {
  try {
    const email = "dummyuser@mail.com";
    const password = await hashPassword("Dumuser@123");
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name: "Dummy user",
        email,
        password,
        userRoles: {
          create: {
            role: {
              connect: { name: RoleName.buyer },
            },
          },
        },
      },
    });

    console.log("✅ Dummy buyer account berhasil dibuat atau sudah ada");
    return user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Terjadi error saat membuat account:", error.message);
  }
}

export async function bulkBuyerSeeder() {
  const usersToCreate = Array.from({ length: 100 });

  for (const i of usersToCreate) {
    try {
      const name = fakerID_ID.person.fullName();
      const email = fakerID_ID.internet.email();
      const password = await hashPassword(`BulkPass@${i}`);
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name: name,
          email,
          password,
          userRoles: {
            create: {
              role: {
                connect: { name: RoleName.buyer },
              },
            },
          },
        },
      });

      console.log("✅ Dummy bulk buyer account berhasil dibuat atau sudah ada");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Terjadi error saat membuat account:", error.message);
    }
  }
}
