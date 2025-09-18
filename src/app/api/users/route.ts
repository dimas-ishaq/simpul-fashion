import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
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
    const userMap = users.map((user) => ({
      id: user.id,
      name: user.name,
      dob: user.dob,
      email: user.email,
      gender: user.gender,
      mobile_number: user.mobile_number,
      image: user.image,
      createdAt: user.createdAt,
      userRoles: user.userRoles.map((item) => item.role.name),
    }));

    return NextResponse.json(
      {
        status: "success",
        data: userMap,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
