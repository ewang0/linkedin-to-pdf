import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const scriptOutput = await new Promise((resolve, reject) => {
      exec("bun run app/scripts/login.ts", (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    return NextResponse.json({ success: true, output: scriptOutput });
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
