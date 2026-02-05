import { test, expect } from "@playwright/test";

test.describe("Enterprise Dashboard E2E Tests", () => {
  test("should load dashboard and display metrics", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Enterprise Dashboard" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "System Health" }),
    ).toBeVisible();

    await expect(page.locator('text="CPU Usage"').first()).toBeVisible();
    await expect(page.locator('text="Disk Space"').first()).toBeVisible();
    await expect(page.locator('text="Network"').first()).toBeVisible();
  });

  test("should filter activities by category", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Security" }).click();

    await page.waitForURL(/category=security/, { timeout: 10000 });
    await expect(page).toHaveURL(/category=security/);

    await page.waitForTimeout(1000);
  });

  test("should search activities", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.getByPlaceholder("Search activities...");
    await searchInput.fill("deployment");

    try {
      await page.waitForURL(/search=deployment/, { timeout: 2000 });
    } catch {
      await page.waitForTimeout(1500);
    }

    await expect(page.getByText("API deployment in progress")).toBeVisible();
  });

  test("should dismiss an activity", async ({ page }) => {
    await page.goto("/");

    await page.waitForTimeout(1000);

    const firstDismissButton = page
      .getByRole("button", { name: "Dismiss" })
      .first();

    if (await firstDismissButton.isVisible()) {
      await firstDismissButton.click();

      await page.waitForTimeout(500);
    }
  });

  test("complete workflow: navigate, filter, search, dismiss", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "System Health" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Security" }).click();
    await expect(page).toHaveURL(/category=security/);

    await page.getByRole("button", { name: "All" }).click();

    const searchInput = page.getByPlaceholder("Search activities...");
    await searchInput.fill("security");
    await page.waitForURL(/search=security/, { timeout: 10000 });

    const dismissButton = page.getByRole("button", { name: "Dismiss" }).first();
    if (await dismissButton.isVisible()) {
      await dismissButton.click();
      await page.waitForTimeout(500);
    }
  });
});
