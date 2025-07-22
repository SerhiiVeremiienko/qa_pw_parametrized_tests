import { test } from '../_fixtures/fixtures';
import { totalPriceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

test('Check total price after adding all coffee cups', async ({ menuPage }) => {
  await menuPage.open();

  let expectedTotal = 0;

  for (const [key, coffee] of Object.entries(COFFEE_NAMES)) {
    const price = COFFEE_PRICES[key];
    expectedTotal += price;
    const expectedTotalStr = totalPriceFormatStr(expectedTotal);

    await menuPage.clickCoffeeCup(coffee);
    await menuPage.assertTotalCheckoutContainsValue(expectedTotalStr);
  }
});
