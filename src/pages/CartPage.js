const { test, expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);
    this.cartListRow = page.getByRole('listitem');
    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  coffeeListItemLocator(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }

  coffeeListItemNameCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(0);
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(3);
  }

  async open() {
    await this.page.goto('/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('/cart');
  }

  async reload() {
    await this.page.reload();
  }

  async clickRemoveAllCoffeeButton(coffeeName) {
    await this.page.getByLabel(`Remove all ${coffeeName}`).click();
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
    await test.step(`Click remove one ${coffeeName} button`, async () => {
      await this.page
        .getByRole('button', { name: `Remove one ${coffeeName}`, exact: true })
        .click();
    });
  }

  async clickAddOneCoffeeButton(coffeeName) {
    await test.step(`Click add one ${coffeeName} button`, async () => {
      await this.page
        .getByRole('button', { name: `Add one ${coffeeName}`, exact: true })
        .click();
    });
  }

  async assertCoffeeIsVisible(coffeeName) {
    await expect(
      this.cartListRow.filter({ hasText: coffeeName }),
    ).toBeVisible();
  }

  async assertCoffeeIsNotVisible(coffeeName) {
    await expect(this.cartListRow.filter({ hasText: coffeeName })).toBeHidden();
  }

  async assertCoffeeNameContainsCorrectText(name) {
    await expect(this.coffeeListItemNameCell(name)).toContainText(name);
  }

  async assertCoffeeUnitContainsCorrectText(coffeeName, expectedText) {
    const field = this.cartListRow
      .filter({ hasText: coffeeName })
      .locator('div')
      .nth(1);
    await expect(field).toContainText(expectedText);
  }

  async assertCoffeeTotalCostContainsCorrectText(coffeeName, expectedText) {
    const field = this.cartListRow
      .filter({ hasText: coffeeName })
      .locator('div')
      .nth(3);
    await expect(field).toContainText(expectedText);
  }

  async assertCoffeeRowIsCorrect(coffeeName, expected) {
    await test.step(`Check ${coffeeName} row`, async () => {
      const row = this.cartListRow
        .filter({ hasText: coffeeName })
        .locator('div');

      const nameField = row.nth(0);
      const unitPriceField = row.nth(1);
      const totalPriceField = row.nth(3);

      await expect(nameField).toContainText(coffeeName);
      await expect(unitPriceField).toContainText(expected.unitPriceFormatStr);
      await expect(totalPriceField).toContainText(expected.totalPriceFormatStr);
    });
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
