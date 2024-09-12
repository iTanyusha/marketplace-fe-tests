import test, { expect } from '@playwright/test';
import { getUrl } from '../../utils/getUrl';
import { sites } from '../../settings/sites-prod';
import { enSearchTerms, enSearchCities, enNoResults } from '../../settings/search-terms';

const testSites = [sites[0], sites[4]]

testSites.forEach(site => {
    const url = getUrl(site.url, 'en', null, site.property);

    enSearchTerms.forEach(term => {
        test(`search in en | ${url} | ${term}`, async ({ page }) => {
            await page.goto(url);
            const urlTerm = encodeURI(term.replaceAll(/ /g, '-'));
            const searchUrl = getUrl(site.url, null, `en/search/1/${urlTerm}`, site.property);
            await expect(page.locator('input#searchInput')).toBeVisible();

            await page.locator('input#searchInput').fill(term);
            await page.keyboard.press('Enter');

            await expect(page).toHaveURL(searchUrl);

            await expect(page.locator('h1').getByText(term)).toBeVisible();

            await expect(page.locator('p#results_count')).toContainText(term);
            await expect(page.locator('p#results_count')).toContainText(/We've found .* results in  about/);
        })
    })

    enSearchCities.forEach((term, i) => {
        test(`search in en | ${url} | ${term}`, async ({ page }) => {
            await page.goto(url);
            const urlTerm = encodeURI(term.replaceAll(/ /g, '-'));
            const searchUrl = getUrl(site.url, null, `en/search/1/cities/${urlTerm}`, site.property);
            await expect(page.locator('input#searchInput')).toBeVisible();

            await page.locator('input#searchInput').fill(term);
            await page.keyboard.press('Enter');

            await expect(page).toHaveURL(searchUrl);

            await expect(page.locator('h1').getByText(/Attractions In/)).toContainText(new RegExp(`Attractions In ${term}`, 'i'));

            await expect(page.locator('p#results_count')).toContainText(/We've found .* results/);
        })
    })

    test(`search in en | ${url} | ${enNoResults}`, async ({ page }) => {
        await page.goto(url);
        const urlTerm = encodeURI(enNoResults.replaceAll(/ /g, '-'));
        const searchUrl = getUrl(site.url, null, `en/search/1/${urlTerm}`, site.property);
        await expect(page.locator('input#searchInput')).toBeVisible();

        await page.locator('input#searchInput').fill(enNoResults);
        await page.keyboard.press('Enter');

        await expect(page).toHaveURL(searchUrl);

        await expect(page.locator('h1').getByText(enNoResults)).toBeVisible();

        await expect(page.locator('p#results_count')).toContainText('Sorry, we didn’t find any search results');
    })
})
