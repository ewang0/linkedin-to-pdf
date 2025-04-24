import { NextResponse } from "next/server";
import { loadLinkedInProfile } from "@/scripts/linkedin-profile";

export async function POST() {
  try {
    // mock data
    const profileData = await loadLinkedInProfile();

    return NextResponse.json({ success: true, profileData });
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
