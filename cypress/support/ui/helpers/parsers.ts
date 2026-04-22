/**
 * Parses the currency amount.
 * @param text - e.g. 'Item total: $12.34' or '$12.34'.
 * @returns - e.g. 12.34, or NaN if no match.
 */
export function parsePriceText(text: string): number {
  const priceRegex = /\d+(?:[.,]\d+)?/;
  const match = text.match(priceRegex);
  if (!match) {
    return Number.NaN;
  }

  const normalizedPrice = match[0].replace(',', '.'); // EU vs USA
  const parsedPrice = parseFloat(normalizedPrice);

  return parsedPrice;
}
