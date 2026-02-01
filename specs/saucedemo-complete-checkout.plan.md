# Saucedemo Complete Checkout Flow

## Application Overview

Complete end-to-end test of the Saucedemo e-commerce platform covering the full user journey from authentication through order completion. The test verifies that authenticated users can add specific products to their cart, manage cart items by removing unwanted products, proceed through the checkout process with personal information, and successfully complete a purchase with proper order confirmation.

## Test Scenarios

### 1. Saucedemo Complete Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete end-to-end purchase with specific items

**File:** `tests/app/functional/saucedemo/complete-checkout.spec.ts`

**Steps:**

1. Open Saucedemo login page
    - expect: Login page is displayed with username and password input fields

2. Log in with credentials - Username: standard_user, Password: secret_sauce
    - expect: User is successfully authenticated
    - expect: Products/inventory page is displayed

3. Add 'Sauce Labs Backpack' to cart by clicking the 'Add to cart' button
    - expect: Item is added to cart
    - expect: Cart counter increments

4. Add 'Sauce Labs Bike Light' to cart by clicking the 'Add to cart' button
    - expect: Item is added to cart
    - expect: Cart counter shows 2 items

5. Navigate to cart by clicking the shopping cart icon
    - expect: Cart page is displayed
    - expect: Both items (Backpack and Bike Light) are visible in the cart

6. Verify that both items are present in the cart
    - expect: Cart contains 'Sauce Labs Backpack'
    - expect: Cart contains 'Sauce Labs Bike Light'
    - expect: Cart item count is 2

7. Remove 'Sauce Labs Bike Light' from cart by clicking its 'Remove' button
    - expect: Bike Light item is removed from cart
    - expect: Only Backpack remains in cart
    - expect: Cart item count is 1

8. Click 'Checkout' button to proceed to checkout process
    - expect: Checkout information page is displayed

9. Fill in checkout details - First Name: John, Last Name: Doe, Zip/Postal Code: 12345
    - expect: All fields are populated with entered data

10. Click 'Continue' button to proceed to checkout overview
    - expect: Checkout overview page is displayed
    - expect: Items to be purchased are shown

11. Click 'Finish' button to complete the order
    - expect: Order completion page is displayed

12. Verify the confirmation message on the order completion page
    - expect: Message 'Thank you for your order!' is visible
    - expect: Confirmation text indicates order was dispatched

13. Take a screenshot of the final confirmation page
    - expect: Screenshot is successfully captured and saved
