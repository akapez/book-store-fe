import { expect, test } from "@playwright/test";

test.describe("Sign In Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/sign-in");
  });

  test("should render Sign In page", async ({ page }) => {
    // Check if the Sign In heading is present
    await expect(page.locator("#sign-in-card-header")).toBeVisible();
    // Check if the input fields and the submit button are present
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator("#sign-in-btn")).toBeVisible();
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    // Click the Sign In button without filling the form
    await page.click("#sign-in-btn");
    // Check if validation messages are displayed
    await expect(page.locator("text=Invalid email address.")).toBeVisible();
    await expect(page.locator("text=Password is required.")).toBeVisible();
  });

  test("should sign in successfully with valid data", async ({ page }) => {
    // Fill the form with valid data
    await page.fill('input[placeholder="Email"]', "sam@example.com");
    await page.fill('input[placeholder="Password"]', "Password123");

    // Click the Sign In button
    await page.click("#sign-in-btn");
  });
});
