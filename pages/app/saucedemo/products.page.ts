import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for Saucedemo inventory/products page.
 * @see https://www.saucedemo.com/inventory.html
 */
export class SaucedemoProductsPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    get sortDropdown(): Locator {
        return this.page.getByTestId('product-sort-container');
    }

    get cartLink(): Locator {
        return this.page.getByTestId('shopping-cart-link');
    }
    get inventory(): Locator {
        return this.page.getByTestId('inventory-container');
    }
    get inventoryItem(): Locator {
        return this.page.getByTestId('inventory-item');
    }

    /**
     * Add-to-cart button for an inventory item (by index, 0-based).
     * @param {number} index - Zero-based index of the item.
     */
    addToCartButton(index: number): Locator {
        return this.inventoryItem
            .nth(index)
            .getByRole('button', { name: /add to cart/i });
    }

    /**
     * Inventory item name link (click navigates to product detail).
     * @param {number} index - Zero-based index of the item.
     */
    itemNameLink(index: number): Locator {
        return this.inventoryItem.nth(index).getByTestId('inventory-item-name');
    }

    /**
     * Locator for an inventory item by product name.
     * @param {string} name - Exact product name.
     */
    itemByName(name: string): Locator {
        return this.inventoryItem.filter({ hasText: name }).first();
    }

    /**
     * Add-to-cart button inside the item matched by name.
     * @param {string} name - Exact product name.
     */
    addToCartButtonForItem(name: string): Locator {
        return this.itemByName(name).getByRole('button', {
            name: /add to cart/i,
        });
    }

    // ==================== Actions ====================

    /**
     * Sorts products by the given option value.
     * @param {string} value - Option value (e.g. 'az', 'za', 'lohi', 'hilo').
     * @returns {Promise<void>}
     */
    async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption({ value });
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Adds all visible inventory items to the cart.
     * Waits for each add action.
     * @returns {Promise<number>} Count of items added.
     */
    async addAllToCart(): Promise<number> {
        await expect(this.inventory).toBeVisible();
        const count = await this.inventoryItem.count();
        for (let i = 0; i < count; i++) {
            await this.addToCartButton(i).click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        return count;
    }

    /**
     * Clicks the product link for the item with the given name.
     * Navigates to product detail page.
     *
     * @param {string} name - Exact product name.
     * @returns {Promise<void>}
     */
    async openProductByName(name: string): Promise<void> {
        const link = this.itemByName(name).getByTestId('inventory-item-name');
        await link.click();
        await expect(
            this.page.getByTestId('inventory-item-name').first()
        ).toBeVisible();
    }

    /**
     * Clicks the cart icon to go to the cart page.
     * @returns {Promise<void>}
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
        await expect(this.page.getByText('Your Cart')).toBeVisible();
    }

    /**
     * Returns the list of product names in current sort order.
     * @returns {Promise<string[]>}
     */
    async getProductNames(): Promise<string[]> {
        const names = await this.page
            .getByTestId('inventory-item-name')
            .allTextContents();
        return names.map((s) => s.trim());
    }
}
