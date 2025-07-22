const { expect, test } = require('@playwright/test');

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappuccinoCup = page.getByTestId('Cappuccino');
    this.cappuccinoCupCost = page
      .getByRole('listitem')
      .filter({ has: this.cappuccinoCup });
    this.espressoCup = page.getByTestId('Espresso');
    this.espressoCupCost = page
      .getByRole('listitem')
      .filter({ has: this.espressoCup });
    this.americanoCup = page.getByTestId('Americano');
    this.cartLink = page.getByLabel('Cart page');
    this.totalCheckout = page.getByTestId('checkout');
    this.promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4.",
    );
    this.yesPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async reload() {
    await this.page.reload();
  }

  coffeeCupLocator(coffeeName) {
    const testId = coffeeName.replace(' ', '_');
    return this.page.getByTestId(testId);
  }

  async open() {
    await this.page.goto('/');
  }

  async clickCoffeeCup(coffeeName) {
    await test.step(`Click coffee cup: ${coffeeName}`, async () => {
      await this.coffeeCupLocator(coffeeName).click();
    });
  }

  async getCoffeePrice(name) {
    return this.page
      .getByRole('listitem')
      .filter({ has: this.coffeeCupLocator(name) })
      .locator('small')
      .first()
      .textContent();
  }

  async clickCartLink() {
    await this.cartLink.click();
  }

  async clickYesPromoButton() {
    await this.yesPromoButton.click();
  }

  async clickNoPromoButton() {
    await this.noPromoButton.click();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }

  async assertPromoMessageIsVisible() {
    await expect(this.promoMessage).toBeVisible();
  }

  async assertPromoMessageIsNotVisible() {
    await expect(this.promoMessage).toBeHidden();
  }

  async assertCoffeeCupCostHasValue(name, value) {
    return expect(
      this.page
        .getByRole('listitem')
        .filter({ has: this.coffeeCupLocator(name) })
        .locator('small')
        .first(),
    ).toContainText(value);
  }
}
