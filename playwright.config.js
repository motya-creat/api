import { defineConfig } from '@playwright/test';

export default defineConfig({
  baseURL: 'http://localhost:5173',
  testDir: './tests',
  expect: {
    toBeVisible: { timeout: 10000 },
  },
});
