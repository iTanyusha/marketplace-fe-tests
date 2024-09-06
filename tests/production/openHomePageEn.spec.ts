import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';

const branchName = process.env.INPUT_BRANCH?.replaceAll(/\//g, '-');

sites.forEach((site) => {
  let url_en: string;
  if (branchName === 'main' || !branchName) {
    url_en = site.url + 'en/'
  }
  else if (branchName === 'dev') {
    url_en = `https://market-dev.bridgify.io/en/?property=${site.property}`
  }
  else {
    url_en = `https://${branchName}.${process.env.INPUT_APP_ID}.amplifyapp.com/en/?property=${site.property}`
  }

  test(`has title, logo and headers en: ${url_en}`, async ({ page }) => {
    await page.goto(`${url_en}`);
    expect(page).toHaveTitle(site.title_en);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading_en)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading_en)).toBeAttached();
  });
});
