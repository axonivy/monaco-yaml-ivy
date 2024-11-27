import { defineConfig, devices } from '@playwright/test';
import { createServer } from 'playwright-monaco'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.CI ? 'http://localhost:4173' : await createServer({
      setup: './tests/setup',
      yaml: './yaml.worker'
    }),
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:4173',
    stdout: 'pipe',
    stderr: 'pipe',
    reuseExistingServer: !process.env.CI,
  },
});
