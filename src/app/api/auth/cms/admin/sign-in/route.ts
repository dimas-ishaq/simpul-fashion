// create login handler cms admin
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { createSession } from "@/lib/jose";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();
    const admin = await prisma.user.findFirst({
      where: { email },
      include: {
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Email tidak terdaftar",
        },
        { status: 404 }
      );
    }
    const isPasswordMatch = await comparePassword(password, admin.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Password belum sesuai",
        },
        { status: 400 }
      );
    }

    const roles = admin.userRoles.map((item) => {
      return item.role.name;
    });

    if (!roles.includes("admin")) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Pengguna tidak terotorisasi",
        },
        { status: 401 }
      );
    }

    await createSession(admin.id, roles);
    return NextResponse.json(
      {
        status: "Success",
        message: "Login successfully",
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          dob: admin.dob,
          gender: admin.gender,
          mobile_number: admin.mobile_number,
          roles: roles,
        },
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "Failed",
        message: `Terjadi kesalahan sistem ${error.message}`,
      },
      { status: 503 }
    );
  }
}
