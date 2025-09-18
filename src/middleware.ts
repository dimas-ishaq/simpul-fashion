import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./lib/jose";

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    if (url.startsWith("/cms/admin") && !url.includes("/cms/admin/sign-in")) {
      const loginUrl = new URL("/cms/admin/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (url.startsWith("/user") || url.startsWith("/shop")) {
      const loginUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (session) {
    if (url.startsWith("/cms/admin/sign-in")) {
      if (session.roles.includes("admin")) {
        const rewriteUrl = new URL("/cms/admin/dashboard", request.url);
        return NextResponse.redirect(rewriteUrl);
      }
    }
    if (url.startsWith("/cms/admin")) {
      if (!session.roles.includes("admin")) {
        const rewriteUrl = new URL("cms/admin/sign-in", request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
    if (url.startsWith("/user")) {
      if (!session.roles.includes("buyer")) {
        const rewriteUrl = new URL("/sign-in", request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
    if (url.startsWith("/shop")) {
      if (!session.roles.includes("seller")) {
        const rewriteUrl = new URL("/user/settings", request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
