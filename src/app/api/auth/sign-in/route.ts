import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { createSession } from "@/lib/jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findFirst({
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

    if (!user) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "User tidak ditemukan",
        },
        { status: 404 }
      );
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          status: "Failed",
          message: "Password belum sesuai",
        },
        { status: 403 }
      );
    }

    const roles = user.userRoles.map((item) => {
      return item.role.name;
    });

    await createSession(user.id, roles);
    return NextResponse.json(
      {
        status: "Success",
        message: "Login successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          mobile_number: user.mobile_number,
          roles: roles,
        },
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      status: "Failed",
      message: `Terjadi kesalahan ${error.message}`,
    });
  }
}
