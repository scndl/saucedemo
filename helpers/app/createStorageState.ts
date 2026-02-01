import { chromium } from '@playwright/test';
import { SaucedemoLoginPage } from '../../pages/app/saucedemo/login.page';
import {
    SAUCEDEMO_PASSWORD,
    SaucedemoUser,
} from '../../enums/app/saucedemo';

/** Path to store the Saucedemo storage state */
const STORAGE_STATE_PATH = '.auth/app/appStorageState.json';

/**
 * Creates and saves the browser storage state after successful Saucedemo login.
 * This is used for authentication setup before running tests.
 *
 * The storage state includes cookies and localStorage, allowing subsequent
 * tests to start in an authenticated state without performing login.
 *
 * @returns {Promise<void>} Resolves when storage state is saved.
 *
 * @example
 * ```ts
 * // In auth.setup.ts
 * test('Setup Saucedemo authentication', async () => {
 *   await createAppStorageState();
 * });
 * ```
 */
export async function createAppStorageState(): Promise<void> {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const saucedemoLoginPage = new SaucedemoLoginPage(page);

    await saucedemoLoginPage.open();
    await saucedemoLoginPage.loginAndVerify(
        SaucedemoUser.STANDARD_USER,
        SAUCEDEMO_PASSWORD
    );

    await context.storageState({ path: STORAGE_STATE_PATH });
    await browser.close();
}
