/**
 * auth.setup.ts
 * Playwright setup script to generate storage states for Saucedemo authentication.
 *
 * This runs before the main test suite to generate browser storage state
 * with session cookies, allowing tests to start in an authenticated state.
 */

import { test } from '../../fixtures/pom/test-options';
import { createAppStorageState } from '../../helpers/app/createStorageState';

test('Setup Saucedemo authentication - Browser storage state', async () => {
    await createAppStorageState();
});
