import { NextResponse } from "next/server";
import { login } from "@/scripts/login";

export async function POST() {
  try {
    const result = await login();
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, state: result.state });
  } catch (error) {
    console.error("Error executing login script:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
