import { test, expect } from '@playwright/test';
import { test as monacoTest } from 'playwright-monaco'

test('monaco YAML page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Monaco/);
});

monacoTest('monaco YAML editor', async ({ editor }) => {
  var base = 'https://json-schema.axonivy.com/ivy/11.3.1'
  var model = `
  # yaml-language-server: $schema=${base}/ivy.json
  SecuritySystems:
    azure:
      IdentityProvider:
        Name: azure-active-directory
        Config:
          ClientId: abc
          InvalidStuff: oblivion
  `;
  await editor.createModel(model, 'file:///ivy.yaml', true, 'yaml')
  const markers = await editor.waitForMarkers('file:///ivy.yaml', async () => {})
  expect(markers.length).toBe(1)

  expect(markers[0].source)
    .toBe(`yaml-schema: ${base}/security-system.json`)
  expect(markers[0].message)
    .toBe('Property InvalidStuff is not allowed.')
});
