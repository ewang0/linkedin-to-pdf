import { chromium } from "playwright";
import fs from "fs";
import { AUTH_DIR, LINKEDIN_AUTH_FILE, LINKEDIN_URL } from "@/lib/config";

export const login = async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LINKEDIN_URL);

  const WAITTIME_FOR_LOGIN = 120000; // 2 mims

  try {
    // Wait for an element on the feed page
    await page.waitForSelector(".ivm-image-view-model", {
      timeout: WAITTIME_FOR_LOGIN,
    });

    console.log("Login successful! Current URL:", await page.url());

    // Only save auth state if login was successful
    // Ensure the auth-cookies directory exists
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
      console.log(`Created directory: ${AUTH_DIR}`);
    }

    // Check if file exists and handle accordingly
    if (!fs.existsSync(LINKEDIN_AUTH_FILE)) {
      fs.writeFileSync(LINKEDIN_AUTH_FILE, "{}");
      console.log(`Created new auth file: ${LINKEDIN_AUTH_FILE}`);
    }

    // Save the session state
    const state = await context.storageState({ path: LINKEDIN_AUTH_FILE });
    console.log("Login credentials saved successfully");
    await context.close();
    await browser.close();
    return { success: true, state };
  } catch (error) {
    console.log(
      "Login was not successful. No credentials will be saved.\n",
      "Current URL:",
      await page.url()
    );
    console.error("Error: ", error);
    // Prevent any lingering processes
    await context.close();
    await browser.close();
    return { success: false, error: error };
  }
};
