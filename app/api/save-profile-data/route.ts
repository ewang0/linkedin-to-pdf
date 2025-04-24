import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { profileData, username } = await request.json();

    // Create a data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "profile-data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Create a filename with the username and timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${username}-${timestamp}.json`;
    const filePath = path.join(dataDir, filename);

    // Write the data to the file
    fs.writeFileSync(filePath, JSON.stringify(profileData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Profile data saved successfully",
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error saving profile data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save profile data" },
      { status: 500 }
    );
  }
}
