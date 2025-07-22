import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';

const coffeeSet = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  coffeeSet.push({ coffee: value, price: COFFEE_PRICES[key] });
}

test('Cart is cleaned after page refreshing', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await test.step(`Add ${coffeeSet.length} coffee(s) to order`, async () => {
    for (const { coffee } of coffeeSet) {
      await menuPage.clickCoffeeCup(coffee);
    }
  });

  await menuPage.assertPromoMessageIsVisible();

  await menuPage.clickNoPromoButton();

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.reload();
  await cartPage.assertNoCoffeeMessageIsVisible();
});
