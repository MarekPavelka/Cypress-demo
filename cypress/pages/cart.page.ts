export class CartPage {
  // #region Getters

  getCartItemRows(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.cart_item');
  }

  getCartItemNames(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.cart_item [data-test="inventory-item-name"]');
  }

  // #endregion

  // #region Actions

  removeCartItem(index: number): void {
    this.getRemoveButtonsInCart().eq(index).click();
  }

  continueShopping(): void {
    this.getContinueShoppingButton().click();
  }

  startCheckout(): void {
    this.getCheckoutButton().click();
  }

  // #endregion

  // #region Assertions

  expectBadgeToMatchCartQuantities(): void {
    cy.get('[data-test="shopping-cart-badge"]').then(($badge) => {
      const badgeCount = parseInt($badge.text().trim(), 10);
      this.getCartItemRows().then(($rows) => {
        const sum = $rows.toArray().reduce((acc, row) => {
          const qtyEl = row.querySelector('[data-test="item-quantity"]');
          const q = qtyEl ? parseInt(qtyEl.textContent?.trim() ?? '1', 10) : 1;
          return acc + q;
        }, 0);
        expect(badgeCount).to.eq(sum);
      });
    });
  }

  // #endregion

  // #region Private

  private getContinueShoppingButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="continue-shopping"]');
  }

  private getCheckoutButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="checkout"]');
  }

  private getRemoveButtonsInCart(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.cart_item [data-test^="remove-"]');
  }

  // #endregion
}
