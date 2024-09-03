import { test, expect } from '@playwright/test';

test('has title, logo and headers', async ({ page }) => {
  await page.goto('https://amexiting.co.il/');

  expect(page).toHaveTitle('דף הבית - אתר ההטבות לאטרקציות בחו"ל ללקוחות אמריקן אקספרס');
  await expect(page.locator('img#navbar-logo')).toBeVisible();
  await expect(page.locator('h1').getByText("מאות אלפי אטרקציות וחוויות בכל העולם בהנחות מיוחדות, רק ללקוחות אמריקן אקספרס")).toBeVisible();
  await expect(page.locator('h2').getByText('אטרקציות שאסור לפספס')).toBeVisible();
});

