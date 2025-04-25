import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { LINKEDIN_AUTH_FILE } from "@/lib/config";
import { Cookie } from "@/types";

// TODO: add DB
export async function GET() {
  try {
    // Path to the LinkedIn auth file
    const authFilePath = path.join(process.cwd(), LINKEDIN_AUTH_FILE);

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
