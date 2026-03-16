import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUserCookie = request.cookies.get("currentUser");
  let currentUser;

  try {
    currentUser = currentUserCookie
      ? JSON.parse(currentUserCookie.value)
      : null;
  } catch (error) {
    currentUser = null;
  }

  const { pathname } = request.nextUrl;

  // Protect /owner routes
  if (pathname.startsWith("/owner")) {
    if (!currentUser || currentUser.role !== "owner") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect /investor routes
  if (pathname.startsWith("/investor")) {
    if (!currentUser || currentUser.role !== "investor") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect /ministry routes
  if (pathname.startsWith("/ministry")) {
    if (!currentUser || currentUser.role !== "ministry") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users trying to access login/register to their dashboard
  if (pathname === "/login" || pathname === "/register") {
    if (currentUser) {
      return NextResponse.redirect(
        new URL(`/${currentUser.role}`, request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/owner/:path*",
    "/investor/:path*",
    "/ministry/:path*",
    "/login",
    "/register",
  ],
};
