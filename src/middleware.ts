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
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";
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

  const cspHeader = `
    default-src 'self';
    script-src 'self' ${
      isDev
        ? `'unsafe-eval' 'unsafe-inline' 'nonce-${nonce}'`
        : `'nonce-${nonce}' 'strict-dynamic'`
    };
    style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    img-src 'self' blob: data: https://res.cloudinary.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${
      isDev
        ? ""
        : `
    block-all-mixed-content;
    upgrade-insecure-requests;`
    };
  `;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim()
  );

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
