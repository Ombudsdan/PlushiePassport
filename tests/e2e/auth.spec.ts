import { expect, test } from "@playwright/test";

test("user can sign up, manage profile, add a plushie, review passport, and log out", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Plushie Passport")).toBeVisible();

  await page.getByRole("link", { name: "Create account" }).click();
  await page.getByLabel("Display Name").fill("Jamie Plush");
  await page.getByLabel("Username").fill("jamie_plush");
  await page.getByLabel(/^Email$/).fill("jamie@example.com");
  await page.getByLabel(/^Password$/).fill("StrongPass123!");
  await page.getByLabel("Confirm Password").fill("StrongPass123!");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("My Plushie Collection")).toBeVisible();

  await page.getByRole("link", { name: "Profile" }).click();
  await expect(page).toHaveURL(/\/profile/);
  await page.getByLabel("Display Name").fill("Jamie Passport");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page.getByText("Profile saved successfully.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Jamie Passport" })).toBeVisible();

  await page.getByRole("button", { name: "Birthday reminders" }).click();
  await page.getByRole("button", { name: "Add Account" }).click();
  await expect(page.getByText("Connected Accounts")).toBeVisible();

  await page.getByRole("link", { name: "Birthdays" }).click();
  await expect(page).toHaveURL(/\/birthdays/);
  await expect(page.getByText("No birthdays to plan yet")).toBeVisible();

  await page.getByRole("link", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search/);
  await expect(page.getByText("No matches yet")).toBeVisible();

  await page.getByRole("link", { name: "My Plushies" }).click();
  await expect(page).toHaveURL(/\/plushies/);
  await page.getByRole("link", { name: "Add Plushie" }).click();
  await page.getByLabel("Name").fill("Comet");
  await page.getByLabel("Species").fill("Dragon");
  await page.getByLabel("Colorway").fill("Sky Blue");
  await page.getByLabel("Hometown").fill("Boston, MA");
  await page.getByLabel("Birthday").fill("2024-01-01");
  await page.getByLabel("Adoption Date").fill("2024-02-01");
  await page.getByLabel("Favorite Snack").fill("Blueberry gummies");
  await page.getByLabel("Favorite Activity").fill("Cloud watching");
  await page.getByLabel("Accessories").fill("Scarf, Satchel");
  await page.getByLabel("Tagline").fill("Sparkly flyer");
  await page.getByRole("button", { name: "Save Plushie" }).click();

  await expect(page).toHaveURL(/\/plushies/);
  await page.getByRole("link", { name: /Comet/ }).click();
  await expect(page).toHaveURL(/\/plushies\//);
  await expect(page.getByRole("heading", { name: "Plushie Passport" })).toBeVisible();
  await expect(page.getByText("Blueberry gummies")).toBeVisible();

  await page.getByRole("link", { name: "Search" }).click();
  await page.getByLabel("Search the plushie world").fill("Comet");
  await expect(page.getByRole("heading", { name: "Comet", exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Notifications" }).click();
  await expect(page).toHaveURL(/\/notifications/);
  await page.getByRole("button", { name: "Unread only" }).click();
  await page.getByRole("button", { name: "Mark all as read" }).click();
  await expect(page.getByText("All caught up")).toBeVisible();

  await page.goto("/logout");
  await expect(page.getByText("You have been logged out")).toBeVisible();
  await page.getByRole("link", { name: "Log back in" }).click();
  await expect(page).toHaveURL(/\/login/);
});
