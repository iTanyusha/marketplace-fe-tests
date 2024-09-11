import { test, expect } from '@playwright/test';
import { sites } from '../../settings/sites-prod';
import { getUrl } from '../../utils/getUrl';
import { alpacaTest } from '../../utils/alpacaTest';

sites.forEach((site) => {
  const url = getUrl(site.url, null, null, site.property);

  test(`has title, logo and headers he: ${url}`, async ({ page }) => {
    await page.goto(url);
    expect(page).toHaveTitle(site.title);
    await expect(page.locator('img#navbar-logo')).toBeVisible();
    await expect(page.locator('h1').getByText(site.heading)).toBeVisible();
    await expect(page.locator('h2').getByText(site.carousel_heading)).toBeAttached();

    await alpacaTest(page);

  });
});
