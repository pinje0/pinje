import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Jika root → redirect /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware untuk route locale
export const config = {
  matcher: [
    "/", // root redirect
    "/(en|id|jp)/:path*", // hanya locale
  ],
};
