import { expect, test } from '../../../../fixtures/pom/test-options';
import {
    SAUCEDEMO_PASSWORD,
    SaucedemoUser,
} from '../../../../enums/app/saucedemo';

test.describe('Saucedemo Scenario 1: Cart, checkout, purchase @functional', () => {
    test.beforeEach(async ({ resetStorageState, saucedemoLoginPage }) => {
        await resetStorageState();
        await saucedemoLoginPage.open();
        await saucedemoLoginPage.loginAndVerify(
            SaucedemoUser.STANDARD_USER,
            SAUCEDEMO_PASSWORD
        );
    });

    test(
        'add all items, remove third, validate overview and complete purchase',
        { tag: '@smoke' },
        async ({
            saucedemoProductsPage,
            saucedemoCartPage,
            saucedemoCheckoutPage,
        }) => {
            await test.step('GIVEN user has added all items to cart', async () => {
                await saucedemoProductsPage.addAllToCart();
            });

            let expectedNames: string[] = [];

            await test.step('WHEN user goes to cart and removes third item', async () => {
                await saucedemoProductsPage.goToCart();
                const namesBefore = await saucedemoCartPage.getCartItemNames();
                expectedNames = namesBefore.filter((_, i) => i !== 2);
                await saucedemoCartPage.removeItem(2);
                expect(await saucedemoCartPage.getCartItemNames()).toEqual(
                    expectedNames
                );
            });

            await test.step('THEN checkout overview shows correct items and count', async () => {
                await saucedemoCartPage.checkout();
                await saucedemoCheckoutPage.fillInfoAndContinue(
                    'Test',
                    'User',
                    '12345'
                );
                const overviewNames =
                    await saucedemoCheckoutPage.getOverviewItemNames();
                const overviewCount =
                    await saucedemoCheckoutPage.getOverviewItemCount();
                expect(overviewNames).toEqual(expectedNames);
                expect(overviewCount).toBe(expectedNames.length);
            });

            await test.step('AND user finishes purchase and sees confirmation', async () => {
                await saucedemoCheckoutPage.finish();
                await saucedemoCheckoutPage.expectOrderConfirmation();
            });
        }
    );
});

test.describe('Saucedemo Scenario 2: Problem user, add by name @known-bug @functional', () => {
    const ITEM_NAME = 'Sauce Labs Onesie';

    test.beforeEach(async ({ resetStorageState, saucedemoLoginPage }) => {
        await resetStorageState();
        await saucedemoLoginPage.open();
        await saucedemoLoginPage.loginAndVerify(
            SaucedemoUser.PROBLEM_USER,
            SAUCEDEMO_PASSWORD
        );
    });

    test.skip(
        'find item by name, add from detail page, validate in cart',
        { tag: '@regression' }, // Known bug: item does not appear in cart
        async ({
            saucedemoProductsPage,
            saucedemoProductDetailPage,
            saucedemoCartPage,
        }) => {
            await test.step('GIVEN user is on products page and finds item by name', async () => {
                await saucedemoProductsPage.openProductByName(ITEM_NAME);
            });

            await test.step('WHEN user adds item to cart from detail page and goes to cart', async () => {
                await saucedemoProductDetailPage.addToCart();
                await saucedemoProductDetailPage.goToCart();
            });

            await test.step('THEN cart does not contain the added item', async () => {
                const names = await saucedemoCartPage.getCartItemNames();
                expect(names).toContain(ITEM_NAME);
            });
        }
    );
});

test.describe('Saucedemo Scenario 3: Sort products by name @functional', () => {
    test.beforeEach(async ({ resetStorageState, saucedemoLoginPage }) => {
        await resetStorageState();
        await saucedemoLoginPage.open();
        await saucedemoLoginPage.loginAndVerify(
            SaucedemoUser.STANDARD_USER,
            SAUCEDEMO_PASSWORD
        );
    });

    test(
        'sort by name A-Z and validate order',
        { tag: '@smoke' },
        async ({ saucedemoProductsPage }) => {
            await test.step('GIVEN user is on products page', async () => {
                await expect(saucedemoProductsPage.sortDropdown).toBeVisible();
            });

            await test.step('WHEN user sorts products by name A-Z', async () => {
                await saucedemoProductsPage.sortBy('az');
            });

            await test.step('THEN product names are sorted alphabetically', async () => {
                const names = await saucedemoProductsPage.getProductNames();
                const sorted = [...names].sort((a, b) => a.localeCompare(b));
                expect(names).toEqual(sorted);
            });
        }
    );
});

test.describe('Saucedemo Scenario 4: Locked-out user login fails @functional', () => {
    test.beforeEach(async ({ resetStorageState, saucedemoLoginPage }) => {
        await resetStorageState();
        await saucedemoLoginPage.open();
    });

    test(
        'locked_out_user cannot login and sees error',
        { tag: '@regression' },
        async ({ saucedemoLoginPage }) => {
            await test.step('GIVEN user is on login page with locked_out credentials', async () => {
                await expect(saucedemoLoginPage.loginButton).toBeVisible();
            });

            await test.step('WHEN user attempts to login', async () => {
                await saucedemoLoginPage.login(
                    SaucedemoUser.LOCKED_OUT_USER,
                    SAUCEDEMO_PASSWORD
                );
            });

            await test.step('THEN login fails and error message is displayed', async () => {
                await expect(saucedemoLoginPage.errorMessage).toBeVisible();
            });
        }
    );
});
