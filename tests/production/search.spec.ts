import test, { expect } from '@playwright/test';
import { getUrl } from '../../utils/getUrl';
import { sites } from '../../settings/sites-prod';
import { heSearchTerms, heSearchCities, enSearchCities, heNoResults } from '../../settings/search-terms';

const testSites = [sites[0], sites[4]]

testSites.forEach(site => {
    const url = getUrl(site.url, null, null, site.property, { testing: 'true' });

    heSearchTerms.forEach(term => {
        test(`search in he | ${url} | ${term}`, async ({ page }) => {
            await page.goto(url);
            const urlTerm = encodeURI(term.replaceAll(/ /g, '-'));
            const searchUrl = getUrl(site.url, 'he', `search/1/${urlTerm}`, site.property);
            await expect(page.locator('input#searchInput')).toBeVisible();

            await page.locator('input#searchInput').fill(term);
            await page.keyboard.press('Enter');

            await expect(page).toHaveURL(searchUrl);

            await expect(page.locator('h1').getByText(term)).toBeVisible();

            await expect(page.locator('p#results_count')).toContainText(term);
            await expect(page.locator('p#results_count')).toContainText(/מצאנו .* תוצאות ב-  עבור/);
        })
    })

    heSearchCities.forEach((term, i) => {
        test(`search in he | ${url} | ${term}`, async ({ page }) => {
            await page.goto(url);
            const urlTerm = encodeURI(enSearchCities[i].replaceAll(/ /g, '-'));
            const searchUrl = getUrl(site.url, 'he', `search/1/cities/${urlTerm}`, site.property);
            await expect(page.locator('input#searchInput')).toBeVisible();

            await page.locator('input#searchInput').fill(term);
            await page.keyboard.press('Enter');

            await expect(page).toHaveURL(searchUrl);

            await expect(page.locator('h1').getByText(/אטרקציות ב/)).toContainText(new RegExp(`אטרקציות ב${term}`, 'i'));

            await expect(page.locator('p#results_count')).toContainText(/מצאנו .* תוצאות/);

        })
    })

    test(`search in he | ${url} | ${heNoResults}`, async ({ page }) => {
        await page.goto(url);
        const urlTerm = encodeURI(heNoResults.replaceAll(/ /g, '-'));
        const searchUrl = getUrl(site.url, 'he', `search/1/${urlTerm}`, site.property);
        await expect(page.locator('input#searchInput')).toBeVisible();

        await page.locator('input#searchInput').fill(heNoResults);
        await page.keyboard.press('Enter');

        await expect(page).toHaveURL(searchUrl);

        await expect(page.locator('h1').getByText(heNoResults)).toBeVisible();

        await expect(page.locator('p#results_count')).toContainText('מצטערים, לא מצאנו תוצאות חיפוש');
    })
})
