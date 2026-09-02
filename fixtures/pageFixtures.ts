import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../data/users';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type AuthFixture = {
  authenticatedPage: InventoryPage;
};

/**
 * Extends the base Playwright test with our Page Object fixtures.
 * Tests import `test` from here instead of '@playwright/test' so every
 * spec gets ready-to-use page objects without repeating setup code.
 */
export const test = base.extend<Pages & AuthFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Pre-authenticated fixture: skips the login UI flow when a test
  // only cares about behaviour AFTER login (keeps tests fast & focused).
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';
