import { test, expect } from '../../fixtures/pageFixtures';
import { products } from '../../data/checkout';
import { isSortedAscending, isSortedDescending } from '../../utils/helpers';

test.describe('Shopping cart', () => {
  test('adds a single product and reflects the count in the cart badge @smoke', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addItemToCartByName(products.backpack);
    expect(await authenticatedPage.getCartCount()).toBe(1);
  });

  test('adds multiple products and updates the badge count accordingly @regression', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addItemToCartByName(products.backpack);
    await authenticatedPage.addItemToCartByName(products.bikeLight);
    await authenticatedPage.addItemToCartByName(products.boltTShirt);
    expect(await authenticatedPage.getCartCount()).toBe(3);
  });

  test('removing an item from the cart page updates the item list @regression', async ({
    authenticatedPage,
    cartPage,
  }) => {
    await authenticatedPage.addItemToCartByName(products.backpack);
    await authenticatedPage.addItemToCartByName(products.bikeLight);
    await authenticatedPage.goToCart();

    expect(await cartPage.itemCount()).toBe(2);
    await cartPage.removeItemByName(products.backpack);
    expect(await cartPage.itemCount()).toBe(1);
  });

  test('sorts products by price low to high @regression', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('lohi');
    const prices = await authenticatedPage.getAllPrices();
    expect(isSortedAscending(prices)).toBeTruthy();
  });

  test('sorts products by price high to low @regression', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('hilo');
    const prices = await authenticatedPage.getAllPrices();
    expect(isSortedDescending(prices)).toBeTruthy();
  });
});
