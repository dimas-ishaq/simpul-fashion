import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";
import { RoleName } from "@/generated/prisma";
import { createSession } from "@/lib/jose";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;
    const securePassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: securePassword,
        userRoles: {
          create: {
            role: {
              connect: { name: RoleName.buyer },
            },
          },
        },
      },
    });
    const roleName = ["buyer"];
    await createSession(user.id, roleName);

    return Response.json(
      {
        status: "Success",
        message: "Akun berhasil dibuat",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan ${error.message}`,
      },
      { status: 500 }
    );
  }
}
