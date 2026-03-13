import { test, expect } from "@playwright/test";

/**
 * E2E Tests: TDD Lab
 * 
 * Suite ID: E2E-LAB-001
 * Feature: TDD Lab - Write Code -> Run Tests -> Success
 */

test.describe("TDD Lab", () => {
  test("Can navigate to TDD Lab from quiz page", async ({ page }) => {
    await page.goto("/quiz");
    
    // Click on TDD Lab link
    await page.getByRole("link", { name: /tdd lab/i }).click();
    
    // Verify we're on the lab page
    await expect(page).toHaveURL(/\/lab/);
    await expect(page.getByText("TDD Lab")).toBeVisible();
  });

  test("Can start a challenge and see the editor", async ({ page }) => {
    await page.goto("/lab");
    
    // Click on the first challenge
    await page.getByText("Login Form Validation").click();
    
    // Verify we're on a challenge page
    await expect(page).toHaveURL(/\/lab\/login-form-validation-001/);
    
    // Verify the code editor is visible
    await expect(page.getByText("solution.js")).toBeVisible();
    
    // Verify Run Tests button exists
    await expect(page.getByRole("button", { name: /run tests/i })).toBeVisible();
  });

  test("Shows test results after running tests", async ({ page }) => {
    await page.goto("/lab/login-form-validation-001");
    
    // Click Run Tests without writing code (should fail)
    await page.getByRole("button", { name: /run tests/i }).click();
    
    // Verify test results appear
    await expect(page.getByText("Test Results")).toBeVisible();
    
    // Tests should fail in red phase
    await expect(page.getByText(/tests passing/)).toBeVisible();
  });

  test("Can see hints", async ({ page }) => {
    await page.goto("/lab/login-form-validation-001");
    
    // Click Hint button
    await page.getByRole("button", { name: /hint/i }).click();
    
    // Verify hint appears
    await expect(page.getByText("Hint 1")).toBeVisible();
  });
});
