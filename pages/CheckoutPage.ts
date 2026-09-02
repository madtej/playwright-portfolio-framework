import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Step one: information form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Step two: overview
  readonly finishButton: Locator;
  readonly totalLabel: Locator;

  // Step three: complete
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

    this.finishButton = page.locator('#finish');
    this.totalLabel = page.locator('.summary_total_label');

    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getTotal(): Promise<string | null> {
    return this.totalLabel.textContent();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async getCompleteMessage(): Promise<string | null> {
    return this.completeHeader.textContent();
  }
}
