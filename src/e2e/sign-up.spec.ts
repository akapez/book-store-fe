import { expect, test } from "@playwright/test";

test.describe("Sign Up Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/sign-up");
  });

  test("should render Sign Up page", async ({ page }) => {
    // Check if the Sign Up heading is present
    await expect(page.locator("#sign-up-card-header")).toBeVisible();
    // Check if the input fields and the submit button are present
    await expect(page.locator('input[placeholder="First Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Last Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('button:has-text("Sign Up")')).toBeVisible();
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    // Click the Sign Up button without filling the form
    await page.click('button:has-text("Sign Up")');
    // Check if validation messages are displayed
    await expect(
      page.locator("text=First name must be at least three characters.")
    ).toBeVisible();
    await expect(
      page.locator("text=Last name must be at least three characters.")
    ).toBeVisible();
    await expect(page.locator("text=Invalid email address.")).toBeVisible();
    await expect(
      page.locator("text=Password must be at least 8 characters long.")
    ).toBeVisible();
  });

  test("should sign up successfully with valid data", async ({ page }) => {
    // Fill the form with valid data
    await page.fill('input[placeholder="First Name"]', "John");
    await page.fill('input[placeholder="Last Name"]', "Doe");
    await page.fill('input[placeholder="Email"]', "john.doe@example.com");
    await page.fill('input[placeholder="Password"]', "Password123");

    await page.click('button:has-text("Sign Up")');
  });
});
