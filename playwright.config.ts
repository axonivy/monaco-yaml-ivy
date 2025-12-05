import { defineConfig, devices } from '@playwright/test';

const URL = process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['junit', { outputFile: 'report.xml' }], ['list']] : 'html',
  use: {
    baseURL: URL,
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],

  webServer: {
    command: process.env.CI ? 'pnpm run serve' : 'pnpm run dev',
    url: URL,
    stdout: 'pipe',
    stderr: 'pipe',
    reuseExistingServer: !process.env.CI
  }
});
