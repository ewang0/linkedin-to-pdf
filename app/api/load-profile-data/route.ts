import { NextResponse } from "next/server";
import { loadLinkedInProfile } from "@/scripts/linkedin-profile";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    const { profileData } = await loadLinkedInProfile(username);

    return NextResponse.json({ success: true, data: profileData });
  } catch (error) {
    console.error("Error loading LinkedIn profile:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
