import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { RoleName } from "@/generated/prisma";

export default async function adminSeeder() {
  try {
    const email = "dimasmaulanaishaq01@gmail.com";
    const password = await hashPassword("Admin123");
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        // Kalau mau tidak mengubah password/nama saat sudah ada, tinggal kosongkan atau sesuaikan
      },
      create: {
        name: "Dimas Maulana Ishaq",
        email,
        password: password,
        userRoles: {
          create: {
            role: {
              connect: { name: RoleName.admin },
            },
          },
        },
      },
    });
    console.log("✅ Admin account berhasil dibuat");
    return admin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Terjadi error saat membuat account:", error.message);
  }
}
