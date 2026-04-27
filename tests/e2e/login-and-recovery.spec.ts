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

  await page.goto("/birthdays");
  await expect(page.getByText("Upcoming celebrations")).toBeVisible();
  await page.getByRole("button", { name: /Pippin/ }).click();
  await expect(page.getByText("Birthday spotlight")).toBeVisible();

  await page.goto("/friends");
  await expect(page.getByText("Friend activity")).toBeVisible();
  await page.getByRole("button", { name: "Pending" }).click();
  await page.getByRole("button", { name: "Accept request" }).click();
  await expect(page.getByText("Friend request accepted.")).toBeVisible();

  await page.goto("/search");
  await expect(page.getByText("Search the plushie world")).toBeVisible();
  await page.getByLabel("Search the plushie world").fill("Mochi");
  await expect(page.getByText("Mochi")).toBeVisible();

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
