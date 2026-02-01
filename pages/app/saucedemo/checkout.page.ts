import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for Saucedemo checkout flow (info, overview, complete).
 * @see https://www.saucedemo.com/checkout-step-one.html etc.
 */
export class SaucedemoCheckoutPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    get firstNameInput(): Locator {
        return this.page.getByTestId('firstName');
    }

    get lastNameInput(): Locator {
        return this.page.getByTestId('lastName');
    }

    get postalCodeInput(): Locator {
        return this.page.getByTestId('postalCode');
    }

    get continueButton(): Locator {
        return this.page.getByRole('button', { name: /continue/i });
    }

    get finishButton(): Locator {
        return this.page.getByRole('button', { name: /finish/i });
    }

    get overviewCartItems(): Locator {
        return this.page.getByTestId('inventory-item');
    }

    get completeHeader(): Locator {
        return this.page.getByTestId('complete-header');
    }

    get completeText(): Locator {
        return this.page.getByTestId('complete-text');
    }

    // ==================== Actions ====================

    /**
     * Fills checkout info and continues to overview.
     *
     * @param {string} firstName - First name.
     * @param {string} lastName - Last name.
     * @param {string} postalCode - Postal code.
     * @returns {Promise<void>}
     */
    async fillInfoAndContinue(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
        await expect(
            this.page.getByTestId('checkout-summary-container')
        ).toBeVisible();
    }

    /**
     * Clicks Finish on the overview step.
     * @returns {Promise<void>}
     */
    async finish(): Promise<void> {
        await this.finishButton.click();
        await expect(this.completeHeader).toBeVisible();
    }

    /**
     * Returns product names listed on the checkout overview.
     * @returns {Promise<string[]>}
     */
    async getOverviewItemNames(): Promise<string[]> {
        const names = await this.page
            .getByTestId('checkout-summary-container')
            .locator('[data-test="inventory-item-name"]')
            .allTextContents();
        return names.map((s) => s.trim());
    }

    /**
     * Returns the number of items on the checkout overview.
     * @returns {Promise<number>}
     */
    async getOverviewItemCount(): Promise<number> {
        return this.overviewCartItems.count();
    }

    /**
     * Asserts the order confirmation message is visible.
     * @returns {Promise<void>}
     */
    async expectOrderConfirmation(): Promise<void> {
        await expect(this.completeHeader).toHaveText(
            'Thank you for your order!'
        );
        await expect(this.completeText).toContainText(
            'Your order has been dispatched'
        );
    }
}
