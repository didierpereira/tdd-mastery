import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Core Vitals
 * 
 * Suite ID: E2E-CORE-001
 * Feature: Application health check
 */

test.describe("Core Vitals", () => {
  test("Home page loads successfully", async ({ page }) => {
    await page.goto("/");
    
    // Verify page loads without crash
    await expect(page).toHaveTitle(/TDD Mastery/i);
  });

  test("Hello TDD heading is visible", async ({ page }) => {
    await page.goto("/");
    
    // Verify the main heading is visible
    const heading = page.getByRole("heading", { name: /hello tdd/i });
    await expect(heading).toBeVisible();
  });

  test("Welcome message is visible", async ({ page }) => {
    await page.goto("/");
    
    // Verify welcome message
    const message = page.getByText(/Welcome to TDD Mastery Platform/i);
    await expect(message).toBeVisible();
  });
});
