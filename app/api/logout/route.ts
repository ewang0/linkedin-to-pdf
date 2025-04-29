import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/db";

export async function POST() {
  try {
    deleteSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, error: "Failed to logout" },
      { status: 500 }
    );
  }
}
