import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';

if (process.env.INPUT_BRANCH === 'main' || process.env.INPUT_BRANCH === undefined)
  console.log('!!! Run tests on main');
else if (process.env.INPUT_BRANCH === 'dev')
  console.log('!!! Run tests on dev', 'https://market-dev.bridgify.io/');
else
  console.log('!!! Run tests on', `https://${process.env.INPUT_BRANCH}.${process.env.INPUT_APP_ID}.amplifyapp.com/`);

sites.forEach((site) => {
  let url_en;
  if (process.env.INPUT_BRANCH === 'main' || process.env.INPUT_BRANCH === undefined) {
    url_en = site.url + 'en/'
  }
  else if (process.env.INPUT_BRANCH === 'dev') {
    url_en = `https://market-dev.bridgify.io/en/?property=${site.property}`
  }
  else {
    url_en = `https://${process.env.INPUT_BRANCH}.${process.env.INPUT_APP_ID}.amplifyapp.com/en/?property=${site.property}`
  }

  test(`has title, logo and headers en: ${url_en}`, async ({ page }) => {
    await page.goto(`${url_en}`);
    expect(page).toHaveTitle(site.title_en);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading_en)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading_en)).toBeAttached();
  });
});
