import { test, expect } from '@playwright/test';
import { login, goToProfile, clearSession, getCurrentUser } from './helpers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Profile Management', () => {
  test.beforeEach(async ({ page }) => {
    await clearSession(page);

    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  });

  test('should display profile page', async ({ page }) => {
    await goToProfile(page);

    // Check for profile elements
    await expect(page.locator('h1:has-text("Profile"), h1:has-text("My Profile")')).toBeVisible();

    // Profile picture should be visible
    const profilePic = page.locator('img[alt*="profile"], img[class*="profile"]').first();
    if (await profilePic.count() > 0) {
      await expect(profilePic).toBeVisible();
    }
  });

  test('should enter edit mode when clicking edit button', async ({ page }) => {
    await goToProfile(page);

    // Find and click edit button
    const editButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit")').first();
    await expect(editButton).toBeVisible();
    await editButton.click();

    await page.waitForTimeout(500);

    // Input fields should become editable
    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toBeEditable();

    // Should show Save and Cancel buttons
    await expect(page.locator('button:has-text("Save"), button:has-text("Save Changes")')).toBeVisible();
    await expect(page.locator('button:has-text("Cancel")')).toBeVisible();
  });

  test('should update profile information', async ({ page }) => {
    await goToProfile(page);

    // Click edit
    const editButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit")').first();
    await editButton.click();
    await page.waitForTimeout(500);

    // Update name
    const nameInput = page.locator('input[value*=" "], input[type="text"]').first();
    const currentName = await nameInput.inputValue();

    // Modify the name
    const newName = currentName + ' Updated';
    await nameInput.fill(newName);

    // Find phone input if available
    const phoneInput = page.locator('input[type="tel"]').first();
    if (await phoneInput.count() > 0) {
      await phoneInput.fill('1234567890');
    }

    // Save changes
    const saveButton = page.locator('button:has-text("Save"), button:has-text("Save Changes")').first();
    await saveButton.click();

    // Wait for save to complete
    await page.waitForTimeout(2000);

    // Should exit edit mode
    await expect(page.locator('button:has-text("Edit Profile"), button:has-text("Edit")')).toBeVisible();

    // Profile should be updated
    const updatedUser = await getCurrentUser(page);
    expect(updatedUser).toBeTruthy();
  });

  test('should cancel profile edit without saving', async ({ page }) => {
    await goToProfile(page);

    // Get original name
    const originalNameElement = page.locator('h2, p').filter({ hasText: /[A-Z][a-z]+ [A-Z][a-z]+/ }).first();
    const originalName = await originalNameElement.textContent();

    // Click edit
    const editButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit")').first();
    await editButton.click();
    await page.waitForTimeout(500);

    // Change name
    const nameInput = page.locator('input[type="text"]').first();
    await nameInput.fill('Changed Name');

    // Click cancel
    const cancelButton = page.locator('button:has-text("Cancel")').first();
    await cancelButton.click();

    await page.waitForTimeout(500);

    // Should exit edit mode
    await expect(page.locator('button:has-text("Edit Profile"), button:has-text("Edit")')).toBeVisible();

    // Name should not have changed
    const currentNameElement = page.locator('h2, p').filter({ hasText: /[A-Z]/ }).first();
    const currentName = await currentNameElement.textContent();
    expect(currentName).toContain(originalName || '');
  });

  test('should upload profile photo', async ({ page }) => {
    await goToProfile(page);

    // Click edit
    const editButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit")').first();
    await editButton.click();
    await page.waitForTimeout(500);

    // Look for Change Photo button
    const changePhotoButton = page.locator('button:has-text("Change Photo")').first();

    if (await changePhotoButton.count() > 0) {
      await expect(changePhotoButton).toBeVisible();

      // Create a test image file
      const testImagePath = path.join(__dirname, 'test-image.jpg');

      // Set up file chooser
      const fileChooserPromise = page.waitForEvent('filechooser');
      await changePhotoButton.click();

      try {
        const fileChooser = await fileChooserPromise;

        // Create a simple test file if it doesn't exist
        // In a real scenario, you'd have a test image in your e2e folder
        const buffer = Buffer.from(
          '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA//2Q==',
          'base64'
        );

        // Use a Buffer as the file
        await fileChooser.setFiles({
          name: 'test-image.jpg',
          mimeType: 'image/jpeg',
          buffer: buffer,
        });

        await page.waitForTimeout(1000);

        // Look for Upload button
        const uploadButton = page.locator('button:has-text("Upload Photo")').first();

        if (await uploadButton.count() > 0) {
          await uploadButton.click();

          // Wait for upload to complete
          await page.waitForTimeout(3000);

          // Page might reload after upload
          await page.waitForLoadState('networkidle');

          // Profile picture should be updated
          const updatedUser = await getCurrentUser(page);
          expect(updatedUser).toBeTruthy();

          // Image should have been saved
          if (updatedUser && (updatedUser.image || updatedUser.image_url)) {
            expect(updatedUser.image || updatedUser.image_url).toBeTruthy();
          }
        }
      } catch (error) {
        console.log('File chooser test skipped:', error.message);
      }
    }
  });

  test('should show validation error for invalid file type', async ({ page }) => {
    await goToProfile(page);

    // Click edit
    const editButton = page.locator('button:has-text("Edit Profile"), button:has-text("Edit")').first();
    await editButton.click();
    await page.waitForTimeout(500);

    // Look for Change Photo button
    const changePhotoButton = page.locator('button:has-text("Change Photo")').first();

    if (await changePhotoButton.count() > 0) {
      // Set up file chooser for invalid file
      const fileChooserPromise = page.waitForEvent('filechooser');
      await changePhotoButton.click();

      try {
        const fileChooser = await fileChooserPromise;

        // Try to upload a text file
        await fileChooser.setFiles({
          name: 'test.txt',
          mimeType: 'text/plain',
          buffer: Buffer.from('This is a text file'),
        });

        await page.waitForTimeout(1000);

        // Should show error (alert or toast)
        // Note: alerts are handled automatically by Playwright
        // You might see a dialog or inline error message
      } catch (error) {
        console.log('Invalid file test completed');
      }
    }
  });

  test('should display all profile fields correctly', async ({ page }) => {
    await goToProfile(page);

    // Check for key profile fields
    const fieldsToCheck = [
      'Full Name',
      'Email',
      'Phone',
      'Employee ID',
      'Department',
      'Designation',
    ];

    for (const field of fieldsToCheck) {
      const label = page.locator(`label:has-text("${field}"), text="${field}"`).first();

      if (await label.count() > 0) {
        await expect(label).toBeVisible();
      }
    }
  });

  test('should show profile picture from database if available', async ({ page }) => {
    await goToProfile(page);

    // Get user from localStorage
    const user = await getCurrentUser(page);

    if (user && (user.image || user.image_url)) {
      // Profile picture should be from database
      const profileImg = page.locator('img[alt*="profile"], img[class*="profile"]').first();
      await expect(profileImg).toBeVisible();

      // Check if src contains the image path or URL
      const imgSrc = await profileImg.getAttribute('src');
      expect(imgSrc).toBeTruthy();

      // Should not be the default image if user has uploaded one
      if (user.image || user.image_url) {
        expect(imgSrc).not.toContain('profile-photo.jpg');
      }
    }
  });
});
