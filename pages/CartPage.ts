import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.removeButtons = page.locator('button', { hasText: 'Remove' });
  }

  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItemByName(name: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: name });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
