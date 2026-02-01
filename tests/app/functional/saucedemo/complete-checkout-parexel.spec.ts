/**
 * Saucedemo Complete Checkout Flow
 *
 * Comprehensive end-to-end test suite validating the complete purchase journey:
 * - User authentication with standard credentials
 * - Product selection and cart management
 * - Checkout process with personal information
 * - Order confirmation verification
 *
 * Test data is externalized to saucedemo-checkout.json for maintainability and reusability.
 * Credentials (username/password) are managed via enums and environment constants.
 *
 * Tags:
 * - @e2e: Full end-to-end workflow covering multiple features
 * - @smoke: Critical user journey that validates core functionality
 */

import { expect, test } from '../../../../fixtures/pom/test-options';
import {
    SAUCEDEMO_PASSWORD,
    SaucedemoUser,
} from '../../../../enums/app/saucedemo';
import testData from '../../../../test-data/app/saucedemo-checkout.json';

test.describe('Saucedemo Complete Checkout Flow @e2e', () => {
    /**
     * Setup: Initialize test environment
     * - Clear any existing authentication state
     * - Open login page for fresh test state
     */
    test.beforeEach(async ({ resetStorageState, saucedemoLoginPage }) => {
        await resetStorageState();
        await saucedemoLoginPage.open();
    });

    /**
     * Complete purchase workflow test
     *
     * Validates the entire customer journey from authentication through order confirmation.
     * Tests critical user paths: login → add items → manage cart → checkout → confirmation
     *
     * @tag @smoke - Essential functionality
     */
    test(
        'should complete end-to-end purchase with specific items and receive order confirmation',
        { tag: '@smoke' },
        async ({
            saucedemoLoginPage,
            saucedemoProductsPage,
            saucedemoCartPage,
            saucedemoCheckoutPage,
            page,
        }) => {
            // ==================== GIVEN ====================
            // User has access to the Saucedemo store

            await test.step('GIVEN user authenticates with valid credentials', async () => {
                await saucedemoLoginPage.loginAndVerify(
                    SaucedemoUser.STANDARD_USER,
                    SAUCEDEMO_PASSWORD
                );

                // Verify successful authentication by checking inventory is visible
                await expect(saucedemoProductsPage.inventory).toBeVisible();
            });

            // ==================== WHEN ====================
            // User performs product selection and cart management

            await test.step(`WHEN user adds "${testData.itemsToAdd[0]}" to cart`, async () => {
                await saucedemoProductsPage
                    .addToCartButtonForItem(testData.itemsToAdd[0])
                    .click();
                await page.waitForLoadState('domcontentloaded');
            });

            await test.step(`AND user adds "${testData.itemsToAdd[1]}" to cart`, async () => {
                await saucedemoProductsPage
                    .addToCartButtonForItem(testData.itemsToAdd[1])
                    .click();
                await page.waitForLoadState('domcontentloaded');
            });

            await test.step('AND user navigates to the shopping cart', async () => {
                await saucedemoProductsPage.goToCart();
            });

            await test.step(`AND user removes "${testData.itemToRemove}" from cart`, async () => {
                const cartItemsBefore =
                    await saucedemoCartPage.getCartItemNames();
                const itemIndexToRemove = cartItemsBefore.indexOf(
                    testData.itemToRemove
                );

                expect(itemIndexToRemove).toBeGreaterThanOrEqual(0);
                await saucedemoCartPage.removeItem(itemIndexToRemove);
            });

            await test.step(
                `AND verify correct item remains in cart after removing "${testData.itemToRemove}"`,
                async () => {
                    const cartItemsAfter =
                        await saucedemoCartPage.getCartItemNames();

                    expect(cartItemsAfter).toContain(testData.itemsToAdd[0]);
                    expect(cartItemsAfter).not.toContain(
                        testData.itemToRemove
                    );
                    expect(cartItemsAfter).toHaveLength(
                        testData.itemsToAdd.length - 1
                    );
                }
            );

            await test.step('AND user proceeds to the checkout page', async () => {
                await saucedemoCartPage.checkout();
            });

            await test.step('AND user enters shipping information', async () => {
                await saucedemoCheckoutPage.fillInfoAndContinue(
                    testData.checkout.firstName,
                    testData.checkout.lastName,
                    testData.checkout.postalCode
                );
            });

            await test.step('AND user completes the purchase', async () => {
                await saucedemoCheckoutPage.finish();
            });

            // ==================== THEN ====================
            // Verify successful order completion and confirmation

            await test.step(`THEN user should see confirmation message "${testData.expectedConfirmation}"`, async () => {
                await expect(saucedemoCheckoutPage.completeHeader).toHaveText(
                    testData.expectedConfirmation
                );
            });

            await test.step('AND confirmation page should be captured for documentation', async () => {
                await page.screenshot({
                    path: 'order-confirmation.png',
                });
            });
        }
    );
});
