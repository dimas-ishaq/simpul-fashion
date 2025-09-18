import { prisma } from "@/lib/prisma";
import { RoleName } from "@/generated/prisma";

export default async function roleSeeder(): Promise<void> {
  const roles = [
    { name: RoleName.admin, description: "Admin" },
    { name: RoleName.seller, description: "Penjual" },
    { name: RoleName.buyer, description: "Pembeli" },
  ];

  for (const r of roles) {
    try {
      await prisma.role.upsert({
        where: { name: r.name },
        update: {},
        create: r,
      });
      console.log(`✅ Role '${r.name}' ter-seed`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(`❌ Gagal seed role '${r.name}':`, err.message);
    }
  }
}
