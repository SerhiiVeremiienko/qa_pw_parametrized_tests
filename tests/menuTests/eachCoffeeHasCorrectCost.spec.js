import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee }) => {
  test(`Check ${coffee} correctly added to the Cart`, async ({ menuPage }) => {
    await menuPage.open();
    await menuPage.getCoffeePrice(coffee);
  });
});
