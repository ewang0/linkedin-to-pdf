import { chromium } from "playwright";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.linkedin.com/login");

  try {
    // Wait for a element on the feed page
    await page.waitForSelector(".ivm-image-view-model", {
      timeout: 120000,
    });

    console.log("Login successful! Current URL:", await page.url());

    // Only save auth state if login was successful
    // Ensure the auth-cookies directory exists
    const authDir = "auth-cookies";
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
      console.log(`Created directory: ${authDir}`);
    }

    // Save the session state
    const authFilePath = path.join(authDir, "linkedin-auth.json");

    try {
      // Check if file exists and handle accordingly
      if (fs.existsSync(authFilePath)) {
        console.log(`Overwriting existing auth file: ${authFilePath}`);
        // Add debug info about the file
        try {
          const stats = fs.statSync(authFilePath);
          console.log(
            `File stats: size=${
              stats.size
            }, isFile=${stats.isFile()}, modified=${stats.mtime}`
          );
        } catch (statError) {
          console.log(`Error getting file stats: ${statError}`);
        }
      } else {
        // Create an empty file first to ensure the path is writable
        fs.writeFileSync(authFilePath, "{}");
        console.log(`Created new auth file: ${authFilePath}`);
      }

      // Save the actual storage state
      await context.storageState({ path: authFilePath });
      console.log("Login credentials saved successfully");
    } catch (error) {
      console.error("Failed to save authentication state:", error);
      process.exit(1);
    }
  } catch (error) {
    console.error("Timeout waiting for feed page:", error);
    console.log("Current URL:", await page.url());
    console.log("Login was not successful. No credentials will be saved.");
  }

  // Prevent any lingering processes
  await context.close();
  await browser.close();
  process.exit(0);
})();
