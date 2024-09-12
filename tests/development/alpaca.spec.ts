import { test } from '@playwright/test';


test.skip('no alpaca', async ({ page }) => {
    await page.goto('http://localhost:3000/en/500');

    for (const img of await page.locator('img').all()) {
        if ((await img.getAttribute('src')).includes('alpaca'))
            throw new Error('Found alpaca')
    }
})

