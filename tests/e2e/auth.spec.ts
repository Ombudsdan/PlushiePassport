import { expect, test } from "@playwright/test";

test("user can sign up, manage profile, and log out", async ({ page }) => {
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
  await expect(page.getByText("Welcome back, Jamie Plush")).toBeVisible();

  await page.getByRole("link", { name: "Manage account" }).click();
  await expect(page).toHaveURL(/\/profile/);
  await page.getByLabel("Display Name").fill("Jamie Passport");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page.getByText("Profile saved successfully.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Jamie Passport" })).toBeVisible();

  await page.getByRole("button", { name: "Birthday reminders" }).click();
  await page.getByRole("button", { name: "Add Account" }).click();
  await expect(page.getByText("Connected Accounts")).toBeVisible();

  await page.goto("/logout");
  await expect(page.getByText("You have been logged out")).toBeVisible();
  await page.getByRole("link", { name: "Log back in" }).click();
  await expect(page).toHaveURL(/\/login/);
});
