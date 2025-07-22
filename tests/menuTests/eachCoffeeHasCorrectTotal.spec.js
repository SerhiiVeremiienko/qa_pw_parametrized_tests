import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Check ${coffee} correctly added to the Cart`, async ({ menuPage }) => {
    const totalPriceStr = priceFormatStr(price);

    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);
    await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    await menuPage.reload();
  });
});
