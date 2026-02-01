import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for Saucedemo product detail page.
 * @see https://www.saucedemo.com/inventory-item.html?id=*
 */
export class SaucedemoProductDetailPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    get productTitle(): Locator {
        return this.page.getByTestId('inventory-item-name');
    }

    get addToCartButton(): Locator {
        return this.page.getByRole('button', { name: /add to cart/i });
    }

    get backToProductsLink(): Locator {
        return this.page.getByTestId('back-to-products');
    }

    get cartLink(): Locator {
        return this.page.getByTestId('shopping-cart-link');
    }

    // ==================== Actions ====================

    /**
     * Adds the current product to the cart.
     * @returns {Promise<void>}
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        await expect(this.page.getByTestId('add-to-cart')).toBeVisible();
    }

    /**
     * Navigates to the cart page via the cart icon.
     * @returns {Promise<void>}
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
        await expect(
            this.page.getByTestId('cart-contents-container')
        ).toBeVisible();
    }
}
