import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';

if (process.env.INPUT_BRANCH === 'main' || process.env.INPUT_BRANCH === undefined)
  console.log('!!! Run tests on main');
else if (process.env.INPUT_BRANCH === 'dev')
  console.log('!!! Run tests on dev', 'https://market-dev.bridgify.io/');
else
  console.log('!!! Run tests on', `https://${process.env.INPUT_BRANCH}.${process.env.INPUT_APP_ID}.amplifyapp.com/`);

sites.forEach((site) => {
  let url;
  if (process.env.INPUT_BRANCH === 'main' || process.env.INPUT_BRANCH === undefined) {
    url = site.url
  }
  else if (process.env.INPUT_BRANCH === 'dev') {
    url = `https://market-dev.bridgify.io/?property=${site.property}`
  }
  else {
    url = `https://${process.env.INPUT_BRANCH}.${process.env.INPUT_APP_ID}.amplifyapp.com/?property=${site.property}`
  }

  test(`has title, logo and headers he: ${url}`, async ({ page }) => {
    await page.goto(url);
    expect(page).toHaveTitle(site.title);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading)).toBeAttached();
  });
});
