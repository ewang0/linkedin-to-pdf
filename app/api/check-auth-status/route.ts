import { NextResponse } from "next/server";
import { getCookies } from "@/lib/db";

export async function GET() {
  try {
    const cookies = getCookies();

    const isAuthenticated =
      cookies &&
      Array.isArray(cookies) &&
      cookies.length > 0 &&
      cookies.some((cookie) => cookie.name === "li_at");

    // Return the authentication status
    return NextResponse.json({
      isAuthenticated,
    });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json(
      {
        isAuthenticated: false,
        error: "Failed to check authentication status",
      },
      { status: 500 } // Return 500 on internal errors
    );
  }
}
