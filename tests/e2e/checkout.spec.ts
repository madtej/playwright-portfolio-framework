import { test, expect } from '../../fixtures/pageFixtures';
import { products, checkoutInfo } from '../../data/checkout';

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCartByName(products.backpack);
    await authenticatedPage.addItemToCartByName(products.bikeLight);
    await authenticatedPage.goToCart();
    await cartPage.checkout();
  });

  test('completes a purchase end-to-end with valid information @smoke', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation(
      checkoutInfo.valid.firstName,
      checkoutInfo.valid.lastName,
      checkoutInfo.valid.postalCode
    );

    const total = await checkoutPage.getTotal();
    expect(total).toMatch(/Total: \$\d+\.\d{2}/);

    await checkoutPage.finishOrder();
    const message = await checkoutPage.getCompleteMessage();
    expect(message).toContain('Thank you for your order');
  });

  test('blocks checkout when required information is missing @regression', async ({
    checkoutPage,
    page,
  }) => {
    await checkoutPage.fillInformation(
      checkoutInfo.missingFirstName.firstName,
      checkoutInfo.missingFirstName.lastName,
      checkoutInfo.missingFirstName.postalCode
    );

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
