import { test, expect } from "@playwright/test";

test("check form fields and submit button", async ({ page }) => {

  await page.goto("http://localhost:3000/");

  const form = page.locator('[data-testid="form"]');
  await expect(form).toBeVisible();

  const firstNameField = page.locator('input[name="firstName"]');
  await expect(firstNameField).toBeVisible();

  const lastNameField = page.locator('input[name="lastName"]');
  await expect(lastNameField).toBeVisible();

  const phoneNumberField = page.locator('input[name="phoneNumber"]');
  await expect(phoneNumberField).toBeVisible();

  const submitButton = page.locator('button:has-text("SEND RESUME")');
  await expect(submitButton).toBeVisible();

  await expect(submitButton).toBeDisabled();

  await firstNameField.fill("John");
  await lastNameField.fill("Doe");
  await phoneNumberField.fill("1234567890");

});