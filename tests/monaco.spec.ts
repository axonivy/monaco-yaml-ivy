import { test, expect } from '@playwright/test';

test('monaco YAML renderer', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Monaco YAML/);
});

