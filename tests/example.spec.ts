import { test, expect, chromium } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', async ({  }) => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });

  // Open new page
  const page = await context.newPage();

  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator('text=Get Started');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
});
