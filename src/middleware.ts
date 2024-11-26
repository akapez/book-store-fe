import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_ROUTES,
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_REDIRECT,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "@lib/routes";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret });
  const isLoggedIn = !!token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPrivate = PRIVATE_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    if (isPrivate) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
  }

  if (isAdminRoute) {
    if (!isLoggedIn || token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
