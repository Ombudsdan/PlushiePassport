import { expect, test } from "@playwright/test";

test("existing user can log in, browse passport details, review notifications, and recover password", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("My Plushie Collection")).toBeVisible();
  await expect(page.getByText("Latest notifications")).toBeVisible();

  await page.goto("/plushies");
  await page.getByRole("link", { name: /Mochi/ }).click();
  await expect(page.getByRole("heading", { name: "Plushie Passport" })).toBeVisible();
  await expect(page.getByText("Collecting station stamps")).toBeVisible();

  await page.goto("/notifications");
  await expect(page.getByText("Notification inbox")).toBeVisible();
  await page.getByRole("button", { name: "Unread only" }).click();
  await expect(page.getByRole("heading", { name: /birthday is coming up|next stop/ }).first()).toBeVisible();

  await page.goto("/profile");
  await expect(page.getByText("Account Settings")).toBeVisible();

  await page.goto("/logout");
  await page.goto("/forgot-password");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByText(/Reset instructions were sent to sarah@example.com/)).toBeVisible();
});
