import { ACCESS_TOKEN } from "@/utils/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  
  const isUserSessionActive = request.cookies.has(ACCESS_TOKEN);
  const { pathname } = new URL(request.url);

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  if (isDashboard && !isUserSessionActive) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthPage && isUserSessionActive) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboard) {
    const response = NextResponse.next();
    response.cookies.set("userDashboard", pathname);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};