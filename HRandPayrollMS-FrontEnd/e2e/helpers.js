/**
 * Helper functions for E2E tests
 */

/**
 * Login as a user
 * @param {import('@playwright/test').Page} page
 * @param {string} email
 * @param {string} password
 */
export async function login(page, email = 'test@example.com', password = 'password123') {
  await page.goto('/login');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard or home
  await page.waitForURL(/\/(dashboard|home|employee)/, { timeout: 10000 });
}

/**
 * Register a new user
 * @param {import('@playwright/test').Page} page
 * @param {object} userData
 */
export async function register(page, userData = {}) {
  const defaultData = {
    firstName: 'Test',
    lastName: 'User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    role: 'employee'
  };

  const data = { ...defaultData, ...userData };

  await page.goto('/register');
  await page.fill('input[name="firstName"]', data.firstName);
  await page.fill('input[name="lastName"]', data.lastName);
  await page.fill('input[type="email"]', data.email);
  await page.fill('input[type="password"]', data.password);

  // Select role if available
  if (await page.locator('select[name="role"]').count() > 0) {
    await page.selectOption('select[name="role"]', data.role);
  }

  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForURL(/\/(dashboard|login|home)/, { timeout: 10000 });

  return data;
}

/**
 * Logout the current user
 * @param {import('@playwright/test').Page} page
 */
export async function logout(page) {
  // Try to find logout button (might be in a dropdown or direct button)
  const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")').first();

  if (await logoutButton.count() > 0) {
    await logoutButton.click();
  }

  // Wait for redirect to login
  await page.waitForURL(/\/(login|\/?)$/, { timeout: 5000 });
}

/**
 * Navigate to profile page
 * @param {import('@playwright/test').Page} page
 */
export async function goToProfile(page) {
  await page.goto('/employee/profile');
  await page.waitForLoadState('networkidle');
}

/**
 * Upload a file to an input
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 * @param {string} filePath
 */
export async function uploadFile(page, selector, filePath) {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click(selector);
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);
}

/**
 * Wait for element to be visible
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 * @param {number} timeout
 */
export async function waitForElement(page, selector, timeout = 5000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Get the current user from localStorage
 * @param {import('@playwright/test').Page} page
 */
export async function getCurrentUser(page) {
  return await page.evaluate(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
}

/**
 * Clear all localStorage and cookies
 * @param {import('@playwright/test').Page} page
 */
export async function clearSession(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.context().clearCookies();
}
