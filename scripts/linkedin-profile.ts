import { LINKEDIN_AUTH_FILE } from "@/lib/config";
import { chromium, Page } from "playwright";

export async function loadLinkedInProfile(username: string) {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({
    storageState: LINKEDIN_AUTH_FILE,
  });

  const page = await context.newPage();
  await page.goto(`https://www.linkedin.com/in/${username}/`);

  const profileData = await scrapeProfileData(page);

  await browser.close();

  return { profileData };
}

async function scrapeProfileData(page: Page) {
  // Get profile picture
  const profilePicSelector = ".profile-photo-edit__preview";
  await page
    .waitForSelector(profilePicSelector, { timeout: 10000 })
    .catch(() => console.log("Profile picture selector not found"));

  // Extract the profile picture URL
  const profilePicture = await page
    .$eval(profilePicSelector, (el) => (el as HTMLImageElement).src)
    .catch(() => "");

  // Wait for education and experience sections to load
  await Promise.all([
    page
      .waitForSelector("#education", { timeout: 15000 })
      .catch(() => console.log("Education section not found")),
    page
      .waitForSelector("#experience", { timeout: 15000 })
      .catch(() => console.log("Experience section not found")),
  ]);

  // Get name and headline
  const name = await page
    .$eval("h1.inline.t-24", (el) => el.textContent?.trim() || "")
    .catch(() => "");

  const headline = await page
    .$eval(
      ".text-body-medium.break-words",
      (el) => el.textContent?.trim() || ""
    )
    .catch(() => "");

  // Get education data
  const educationItems = await page
    .$$eval("#education ~ div ul > li", (items: Element[]) => {
      return items.map((item) => {
        const schoolName =
          item.querySelector(".t-bold span:first-child")?.textContent?.trim() ||
          "";
        const degree =
          item
            .querySelector(
              ".t-14.t-normal:not(.t-black--light) span:first-child"
            )
            ?.textContent?.trim() || "";
        const year =
          item
            .querySelector(".t-14.t-normal.t-black--light span:first-child")
            ?.textContent?.trim() || "";

        return {
          schoolName,
          degree,
          year,
        };
      });
    })
    .catch(() => []);

  // Get experience data
  const experienceItems = await page
    .$$eval(
      "#experience ~ div ul > li.artdeco-list__item",
      (items: Element[]) => {
        // Filter out the actual job items (main entries only)
        return items
          .filter((item) => {
            // Only include items that have a proper job title
            const hasTitle = !!item
              .querySelector(".t-bold span:first-child")
              ?.textContent?.trim();
            // Check if this is a main entry (not a duplicate or description)
            const isMainEntry = !!item
              .querySelector(".t-14.t-normal.t-black--light span:first-child")
              ?.textContent?.match(/\d{4}/);
            return hasTitle && isMainEntry;
          })
          .map((item) => {
            const title =
              item
                .querySelector(".t-bold span:first-child")
                ?.textContent?.trim() || "";
            const companyInfo = (
              item
                .querySelector(
                  ".t-14.t-normal:not(.t-black--light) span:first-child"
                )
                ?.textContent?.trim() || ""
            )
              .split(/[·•]/, 1)[0]
              .trim();

            // Get duration and location
            const dateElements = item.querySelectorAll(
              ".t-14.t-normal.t-black--light"
            );
            const duration =
              dateElements[0]
                ?.querySelector("span:first-child")
                ?.textContent?.trim() || "";
            const location =
              dateElements[1]
                ?.querySelector("span:first-child")
                ?.textContent?.trim() || "";

            // Get description items if any
            const descriptions = Array.from(
              item.querySelectorAll(
                ".inline-show-more-text--is-collapsed, .inline-show-more-text--is-collapsed-with-line-clamp"
              )
            )
              .map((desc: Element) => {
                const span = desc.querySelector("span:not(.visually-hidden)");
                return span?.textContent?.trim() || "";
              })
              .filter(Boolean)
              .filter((text) => text !== "<!---->"); // Remove any HTML comment markers

            return {
              title,
              companyInfo,
              duration,
              location,
              descriptions,
            };
          });
      }
    )
    .catch(() => []);

  return {
    name,
    headline,
    profilePicture,
    education: educationItems,
    experience: experienceItems,
  };
}
