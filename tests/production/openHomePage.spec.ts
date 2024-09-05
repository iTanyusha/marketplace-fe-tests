import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';

const branchName = process.env.INPUT_BRANCH?.replaceAll(/\//g, '-');

sites.forEach((site) => {
  let url: string;
  if (branchName === 'main' || branchName === undefined) {
    url = site.url
  }
  else if (branchName === 'dev') {
    url = `https://market-dev.bridgify.io/?property=${site.property}`
  }
  else {
    url = `https://${branchName}.${process.env.INPUT_APP_ID}.amplifyapp.com/?property=${site.property}`
  }

  test(`has title, logo and headers he: ${url}`, async ({ page }) => {
    await page.goto(url);
    expect(page).toHaveTitle(site.title);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading)).toBeAttached();
  });
});
