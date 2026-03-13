import { test, expect } from "@playwright/test";

/**
 * E2E Tests: Core Vitals
 * 
 * Suite ID: E2E-CORE-001
 * Feature: Application health check
 */

test.describe("Core Vitals", () => {
  test("Home page loads and redirects to quiz list", async ({ page }) => {
    await page.goto("/");
    
    // Verify page loads and redirects to /quiz
    await expect(page).toHaveURL(/\/quiz/);
    await expect(page).toHaveTitle(/TDD Mastery/i);
  });

  test("Quiz list displays available modules", async ({ page }) => {
    await page.goto("/quiz");
    
    // Verify quiz list heading is visible
    const heading = page.getByRole("heading", { name: /available modules/i });
    await expect(heading).toBeVisible();
  });

  test("Can navigate to a quiz", async ({ page }) => {
    await page.goto("/quiz");
    
    // Click on the first quiz
    await page.getByText("TDD Fundamentals").click();
    
    // Verify we're on a quiz page
    await expect(page).toHaveURL(/\/quiz\/tdd-basics-001/);
    await expect(page.getByText("Question 1", { exact: true })).toBeVisible();
  });
});
