import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "/register", "/"];

  if (publicPaths.includes(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin route check
  if (pathname.startsWith("/admin")) {
    if (token.userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Define which paths will be matched by middleware
export const config = {
  matcher: ["/admin/:path*", "/account", "/orders", "/wishlist", "/reviews"],
};
