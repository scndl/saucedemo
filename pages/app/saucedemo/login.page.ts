import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object for Saucedemo login page.
 * @see https://www.saucedemo.com/
 */
export class SaucedemoLoginPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    get usernameInput(): Locator {
        return this.page.getByPlaceholder('Username');
    }

    get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get errorMessage(): Locator {
        return this.page.getByTestId('error');
    }

    // ==================== Actions ====================

    /**
     * Navigates to the Saucedemo login page.
     * @returns {Promise<void>}
     */
    async open(): Promise<void> {
        await this.page.goto(process.env.APP_URL!, {
            waitUntil: 'domcontentloaded',
        });
    }

    /**
     * Fills username and password, then clicks Login.
     * Does not wait for navigation; use when login may fail (e.g. locked user).
     *
     * @param {string} username - Saucedemo username.
     * @param {string} password - Saucedemo password.
     * @returns {Promise<void>}
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Performs login and verifies success by waiting for inventory page.
     *
     * @param {string} username - Saucedemo username.
     * @param {string} password - Saucedemo password.
     * @returns {Promise<void>}
     */
    async loginAndVerify(username: string, password: string): Promise<void> {
        await this.login(username, password);
        await expect(
            this.page.locator('[data-test="shopping-cart-link"]')
        ).toBeVisible();
    }
}
