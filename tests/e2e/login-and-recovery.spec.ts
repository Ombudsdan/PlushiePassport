import { expect, test } from "@playwright/test";

test("existing user can log in and recover password", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("Welcome back, Sarah Johnson")).toBeVisible();

  await page.goto("/profile");
  await expect(page.getByText("Account Settings")).toBeVisible();

  await page.goto("/logout");
  await page.goto("/forgot-password");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByText(/Reset instructions were sent to sarah@example.com/)).toBeVisible();
});
