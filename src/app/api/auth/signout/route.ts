import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  try {
    // Retrieve the JWT from the request
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    const accessToken = token?.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Access token not found." },
        { status: 401 }
      );
    }
    const apiUrl = `${process.env.API_BASE_URL}/auth/logout`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      // Clear specific cookies
      const nextCookies = await cookies();
      nextCookies.getAll().map((cookie) => {
        if (cookie.name.startsWith("next-auth"))
          nextCookies.delete(cookie.name);
      });
    }
    return NextResponse.json(
      {
        success: res.ok,
        status: res.status,
      },
      { status: res.status }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
