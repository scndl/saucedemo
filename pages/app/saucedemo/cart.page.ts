import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for Saucedemo cart page.
 * @see https://www.saucedemo.com/cart.html
 */
export class SaucedemoCartPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    get cartItems(): Locator {
        return this.page.getByTestId('inventory-item');
    }

    get checkoutButton(): Locator {
        return this.page.getByRole('button', { name: /checkout/i });
    }

    /**
     * Remove button for the nth cart item (0-based).
     * @param {number} index - Zero-based index.
     */
    removeButton(index: number): Locator {
        return this.cartItems
            .nth(index)
            .getByRole('button', { name: /remove/i });
    }

    /**
     * Cart item name for the nth item.
     * @param {number} index - Zero-based index.
     */
    itemName(index: number): Locator {
        return this.cartItems.nth(index).getByTestId('inventory-item-name');
    }

    // ==================== Actions ====================

    /**
     * Removes the nth item from the cart (0-based).
     * @param {number} index - Zero-based index of the item to remove.
     * @returns {Promise<void>}
     */
    async removeItem(index: number): Promise<void> {
        await this.removeButton(index).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Clicks Checkout and navigates to checkout step one.
     * @returns {Promise<void>}
     */
    async checkout(): Promise<void> {
        await this.checkoutButton.click();
        await expect(
            this.page.getByTestId('checkout-info-container')
        ).toBeVisible();
    }

    /**
     * Returns the list of product names in the cart.
     * @returns {Promise<string[]>}
     */
    async getCartItemNames(): Promise<string[]> {
        const names = await this.cartItems
            .getByTestId('inventory-item-name')
            .allTextContents();
        return names.map((s) => s.trim());
    }

    /**
     * Returns the number of items in the cart.
     * @returns {Promise<number>}
     */
    async getCartCount(): Promise<number> {
        return this.cartItems.count();
    }
}
