import { test, expect, type Page } from '@playwright/test';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

declare global {
  interface Window {
    codeEditor: editor.ICodeEditor;
  }
}

test('title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Monaco/);
});

test('markers', async ({ page }) => {
  await page.goto('/');
  await setContent(page);
  const invalid = page.locator('text=InvalidStuff');
  await expect(invalid).toBeVisible();
  await expect(page.locator('.squiggly-warning')).toBeVisible();
  await invalid.hover();
  await expect(page.locator('.marker.hover-contents')).toHaveText(/Property InvalidStuff is not allowed./);
});

test('hover info', async ({ page }) => {
  await page.goto('/');
  await setContent(page);
  const info = page.locator('text=Name');
  await info.hover();
  await expect(page.locator('.code-hover-contents')).toHaveText(/The Security System manages the user and roles in the system database./);
});

const setContent = async (page: Page) => {
  await page.evaluate(() => {
    window.codeEditor.getModel()!.setValue(`# yaml-language-server: $schema=https://json-schema.axonivy.com/ivy/11.3.1/ivy.json
SecuritySystems:
  azure:
    IdentityProvider:
      Name: azure-active-directory
      Config:
        ClientId: abc
        InvalidStuff: oblivion
`);
  });
};
