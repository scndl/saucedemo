import { test as base } from '@playwright/test';
import { SaucedemoCartPage } from '../../pages/app/saucedemo/cart.page';
import { SaucedemoCheckoutPage } from '../../pages/app/saucedemo/checkout.page';
import { SaucedemoLoginPage } from '../../pages/app/saucedemo/login.page';
import { SaucedemoProductDetailPage } from '../../pages/app/saucedemo/product-detail.page';
import { SaucedemoProductsPage } from '../../pages/app/saucedemo/products.page';

/**
 * Framework fixtures for Saucedemo page objects.
 */
export type FrameworkFixtures = {
    resetStorageState: () => Promise<void>;
    /** Saucedemo login page */
    saucedemoLoginPage: SaucedemoLoginPage;
    /** Saucedemo products/inventory page */
    saucedemoProductsPage: SaucedemoProductsPage;
    /** Saucedemo product detail page */
    saucedemoProductDetailPage: SaucedemoProductDetailPage;
    /** Saucedemo cart page */
    saucedemoCartPage: SaucedemoCartPage;
    /** Saucedemo checkout page */
    saucedemoCheckoutPage: SaucedemoCheckoutPage;
};

/**
 * Extended test with Saucedemo page object fixtures.
 * Import this in your test files to access page objects.
 *
 * @example
 * ```ts
 * import { test, expect } from '../../../../fixtures/pom/test-options';
 *
 * test('example test', async ({ saucedemoLoginPage }) => {
 *   await saucedemoLoginPage.open();
 *   await expect(saucedemoLoginPage.loginButton).toBeVisible();
 * });
 * ```
 */
export const test = base.extend<FrameworkFixtures>({
    resetStorageState: async ({ context }, use) => {
        await use(async () => {
            await context.clearCookies();
            await context.clearPermissions();
        });
    },

    saucedemoLoginPage: async ({ page }, use) => {
        await use(new SaucedemoLoginPage(page));
    },
    saucedemoProductsPage: async ({ page }, use) => {
        await use(new SaucedemoProductsPage(page));
    },
    saucedemoProductDetailPage: async ({ page }, use) => {
        await use(new SaucedemoProductDetailPage(page));
    },
    saucedemoCartPage: async ({ page }, use) => {
        await use(new SaucedemoCartPage(page));
    },
    saucedemoCheckoutPage: async ({ page }, use) => {
        await use(new SaucedemoCheckoutPage(page));
    },
});

export { expect } from '@playwright/test';
