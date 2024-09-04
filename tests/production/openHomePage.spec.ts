import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';

if (process.env.INPUT_BRANCH === 'main')
  console.log('run tests on main');
else if (process.env.INPUT_BRANCH === 'dev')
  console.log('run tests on dev', 'https://market-dev.bridgify.io/');
else
  console.log('run tests on', `https//:${process.env.INPUT_BRANCH}.${process.env.INPUT_APP_ID}.amplifyapp.com/`);



sites.forEach((site) => {
  test(`has title, logo and headers he: ${site.url}`, async ({ page }) => {
    console.log(process.env.DATA_TEST);

    await page.goto(site.url);
    expect(page).toHaveTitle(site.title);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading)).toBeAttached();
  });

  test(`has title, logo and headers en: ${site.url}`, async ({ page }) => {
    await page.goto(`${site.url}en/`);
    expect(page).toHaveTitle(site.title_en);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading_en)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading_en)).toBeAttached();
  });
});
