export function unitPriceFormatStr(unitPrice, unitsNumber = 1) {
  return `$${unitPrice.toFixed(2)} x ${unitsNumber}`;
}

export function priceFormatStr(unitPrice, unitsNumber = 1) {
  return `$${(unitPrice * unitsNumber).toFixed(2)}`;
}

export function totalPriceFormatStr(unitPrice) {
  return `Total: $${unitPrice.toFixed(2)}`;
}
