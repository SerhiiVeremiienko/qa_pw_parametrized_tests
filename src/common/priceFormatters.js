export function unitPriceFormatStr(unitPrice, unitsNumber = 1) {
  return `${unitPrice}.00 x ${unitsNumber}`;
}

export function priceFormatStr(unitPrice, unitsNumber = 1) {
  return `${unitPrice * unitsNumber}.00`;
}

export function totalPriceFormatStr(unitPrice) {
  return `Total: $${unitPrice}.00`;
}
