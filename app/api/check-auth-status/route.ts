import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
}

export async function GET() {
  try {
    // Path to the LinkedIn auth file
    const authFilePath = path.join(
      process.cwd(),
      "app/auth-cookies/linkedin-auth.json"
    );

    // Check if the file exists
    let fileExists = false;
    try {
      await fs.access(authFilePath);
      fileExists = true;
    } catch {
      fileExists = false;
    }

    if (!fileExists) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // Read the file content
    const fileContent = await fs.readFile(authFilePath, "utf-8");
    const authData = JSON.parse(fileContent);

    // Check if the file has valid authentication data
    // Consider the user authenticated if there are cookies, especially li_at cookie
    const isAuthenticated =
      authData.cookies &&
      Array.isArray(authData.cookies) &&
      authData.cookies.length > 0 &&
      authData.cookies.some((cookie: Cookie) => cookie.name === "li_at");

    // Return the authentication status
    return NextResponse.json({
      isAuthenticated,
    });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json({
      isAuthenticated: false,
      error: "Failed to check authentication status",
    });
  }
}
