import { test } from '../_fixtures/fixtures';
import {
  unitPriceFormatStr,
  priceFormatStr,
  totalPriceFormatStr,
} from '../../src/common/priceFormatters';
import {
  COFFEE_NAMES,
  COFFEE_PRICES,
  COFFEE_DISCOUNT,
} from '../../src/constants';

const selectedCoffees = ['espresso', 'cappuccino', 'americano'];
const coffeeSet = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  if (selectedCoffees.includes(value.toLowerCase())) {
    coffeeSet.push({ coffee: value, price: COFFEE_PRICES[key] });
  }
}

test('Assert discounted Mocha added to the Cart after promo accepting', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await test.step('Add 3 coffee to order', async () => {
    for (const { coffee } of coffeeSet) {
      await menuPage.clickCoffeeCup(coffee);
    }
  });

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickYesPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await test.step('Check prices for each and total', async () => {
    let expectedTotal = 0;
    coffeeSet.push(COFFEE_DISCOUNT);

    for (const { coffee, price } of coffeeSet) {
      const totalPriceStr = priceFormatStr(price);
      const unitPriceStr = unitPriceFormatStr(price, 1);
      expectedTotal += price;

      await cartPage.assertCoffeeNameContainsCorrectText(coffee);
      await cartPage.assertCoffeeUnitContainsCorrectText(coffee, unitPriceStr);
      await cartPage.assertCoffeeTotalCostContainsCorrectText(
        coffee,
        totalPriceStr,
      );
    }

    const expectedTotalStr = totalPriceFormatStr(expectedTotal);
    await menuPage.assertTotalCheckoutContainsValue(expectedTotalStr);
  });
});
