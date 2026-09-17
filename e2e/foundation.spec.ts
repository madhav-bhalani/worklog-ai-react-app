import { expect, test } from "@playwright/test";

test("renders the Worklog AI foundation", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "A clean starting point for Worklog AI.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("group", { name: "Color theme" })).toBeVisible();
});
