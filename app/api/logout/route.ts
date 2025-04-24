import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { LINKEDIN_AUTH_FILE } from "@/lib/config";
export async function POST() {
  try {
    const filePath = path.join(process.cwd(), LINKEDIN_AUTH_FILE);

    // Check if file exists before attempting to delete
    try {
      await fs.access(filePath);
      // If file exists, delete it
      await fs.unlink(filePath);
    } catch (error) {
      console.log(error);
      console.log("Auth file already deleted or does not exist");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    );
  }
}
