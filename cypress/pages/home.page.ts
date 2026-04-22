import { parsePriceText } from '../support/helpers';

export enum InventorySortOption {
  AtoZ = 'az',
  ZtoA = 'za',
  LowToHigh = 'lohi',
  HighToLow = 'hilo',
}

export class HomePage {
  // region Getters

  getProductSortSelect(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('select.product_sort_container');
  }

  getProductPrices(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="inventory-item-price"]');
  }

  getProductAddToCartButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test^="add-to-cart-"]').eq(index);
  }

  getProductRemoveFromCartButton(index: number): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test^="remove-"]').eq(index);
  }

  getAllRemoveFromCartButtons(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test^="remove-"]');
  }

  // #endregion

  // #region Actions

  selectSort(option: InventorySortOption): void {
    this.getProductSortSelect().select(option);
  }

  addProductToCart(index: number): void {
    this.getProductAddToCartButton(index).click();
  }

  removeProductFromCart(index: number): void {
    this.getProductRemoveFromCartButton(index).click();
  }

  addFirstProductToCart(): void {
    this.getFirstAddToCartButton().click();
  }

  // #endregion

  // #region Assertions

  expectProductNamesSortedAscending(): void {
    this.getProductNames().then(($names) => {
      const names = $names.toArray().map((el) => el.innerText);
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
  }

  expectProductNamesSortedDescending(): void {
    this.getProductNames().then(($names) => {
      const names = $names.toArray().map((el) => el.innerText);
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });
  }

  expectProductPricesSortedAscending(): void {
    this.getProductPrices().then(($prices) => {
      const values = $prices.toArray().map((el) => parsePriceText(el.innerText));
      const sorted = [...values].sort((a, b) => a - b);
      expect(values).to.deep.equal(sorted);
    });
  }

  expectProductPricesSortedDescending(): void {
    this.getProductPrices().then(($prices) => {
      const values = $prices.toArray().map((el) => parsePriceText(el.innerText));
      const sorted = [...values].sort((a, b) => b - a);
      expect(values).to.deep.equal(sorted);
    });
  }

  // #endregion

  // #region Private

  private getFirstAddToCartButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test^="add-to-cart-"]').first();
  }

  private getProductNames(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="inventory-item-name"]');
  }

  // #endregion
}
