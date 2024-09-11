import { Page } from '@playwright/test'

export const alpacaTest = async (page: Page) => {
    for (const img of await page.locator('img').all()) {
        if ((await img.getAttribute('src')).includes('alpaca'))
            throw new Error('Found alpaca')
    }
}