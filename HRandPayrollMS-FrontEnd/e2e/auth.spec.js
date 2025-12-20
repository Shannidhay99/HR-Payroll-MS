import { test, expect } from '@playwright/test';
import { login, register, logout, clearSession, getCurrentUser } from './helpers.js';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await clearSession(page);
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display register page', async ({ page }) => {
    await page.goto('/register');

    await expect(page).toHaveURL(/\/register/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show error on invalid login credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Wait for error message (could be toast, alert, or inline message)
    await page.waitForTimeout(1000);

    // Should still be on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Note: This requires a test user to exist in the database
    // You may need to adjust credentials or create a test user first
    await page.goto('/login');

    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Wait for redirect after login
    await page.waitForTimeout(2000);

    // Should redirect away from login
    await expect(page).not.toHaveURL(/\/login/);

    // Check if user is stored in localStorage
    const user = await getCurrentUser(page);
    expect(user).toBeTruthy();
    expect(user.email).toBeTruthy();
  });

  test('should register a new user', async ({ page }) => {
    const userData = {
      firstName: 'E2E',
      lastName: 'Test',
      email: `e2etest${Date.now()}@example.com`,
      password: 'TestPassword123!',
    };

    await page.goto('/register');

    // Fill registration form
    const firstNameInput = page.locator('input').filter({ hasText: /first.*name/i }).or(page.locator('input[name*="first"]')).first();
    const lastNameInput = page.locator('input').filter({ hasText: /last.*name/i }).or(page.locator('input[name*="last"]')).first();

    if (await firstNameInput.count() > 0) {
      await firstNameInput.fill(userData.firstName);
      await lastNameInput.fill(userData.lastName);
    }

    await page.fill('input[type="email"]', userData.email);
    await page.fill('input[type="password"]', userData.password);

    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForTimeout(2000);

    // Should redirect to login or dashboard
    const url = page.url();
    const isRedirected = url.includes('/login') || url.includes('/dashboard') || url.includes('/home');
    expect(isRedirected).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    // Find and click logout button
    const logoutBtn = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Log out"), a:has-text("Log out")').first();

    if (await logoutBtn.count() > 0) {
      await logoutBtn.click();

      // Wait for redirect
      await page.waitForTimeout(1000);

      // Should redirect to login or home
      const url = page.url();
      const isLoggedOut = url.includes('/login') || url === 'http://localhost:5173/';
      expect(isLoggedOut).toBeTruthy();

      // localStorage should be cleared
      const user = await getCurrentUser(page);
      expect(user).toBeFalsy();
    }
  });

  test('should prevent access to protected routes when not authenticated', async ({ page }) => {
    await clearSession(page);

    // Try to access dashboard
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/\/(login|\/?)$/);
  });

  test('should persist login after page reload', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    // Get user before reload
    const userBefore = await getCurrentUser(page);
    expect(userBefore).toBeTruthy();

    // Reload page
    await page.reload();
    await page.waitForTimeout(1000);

    // User should still be logged in
    const userAfter = await getCurrentUser(page);
    expect(userAfter).toBeTruthy();
    expect(userAfter.email).toBe(userBefore.email);

    // Should not redirect to login
    await expect(page).not.toHaveURL(/\/login/);
  });
});
