import { chromium } from "playwright";
import { LINKEDIN_URL } from "@/lib/config";
import { saveCookies } from "@/lib/db";

export const login = async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(LINKEDIN_URL);

  const WAITTIME_FOR_LOGIN = 120000; // 2 mins

  try {
    // Wait for an element on the feed page
    // TODO: choose a more stable selector
    await page.waitForSelector(".ivm-image-view-model", {
      timeout: WAITTIME_FOR_LOGIN,
    });

    console.log("Login successful! Current URL:", await page.url());

    // Get cookies from the context
    const cookies = await context.cookies();

    // Save cookies securely to the database
    saveCookies(cookies);

    // No need to return state anymore, just success
    await context.close();
    await browser.close();
    return { success: true };
  } catch (error) {
    console.log(
      "Login was not successful. No credentials will be saved.\n",
      "Current URL:",
      await page.url()
    );
    console.error("Error: ", error);
    await context.close();
    await browser.close();
    return { success: false, error: error };
  }
};
