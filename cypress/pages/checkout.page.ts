export class CheckoutPage {
  // #region Getters

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="error"]');
  }

  getFinishButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="finish"]');
  }

  getOrderCompletedHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="complete-header"]');
  }

  getStepTwoCartItems(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="checkout-summary-container"] .cart_item');
  }

  getStepTwoItemPrices(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="checkout-summary-container"] [data-test="inventory-item-price"]');
  }

  getStepTwoItemNames(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="checkout-summary-container"] [data-test="inventory-item-name"]');
  }

  // #endregion

  // #region Actions

  fillStepOne(firstName: string, lastName: string, postalCode: string): void {
    if (firstName.length > 0) {
      this.getFirstNameInput().type(firstName);
    }
    if (lastName.length > 0) {
      this.getLastNameInput().type(lastName);
    }
    if (postalCode.length > 0) {
      this.getPostalCodeInput().type(postalCode);
    }
  }

  submitStepOne(): void {
    this.getContinueButton().click();
  }

  finishOrder(): void {
    this.getFinishButton().click();
  }

  clickBackHome(): void {
    this.getBackToProductsButton().click();
  }

  // #endregion

  // #region Assertions

  verifyStepOneFormInputsAreVisible(): void {
    this.getFirstNameInput().should('be.visible');
    this.getLastNameInput().should('be.visible');
    this.getContinueButton().should('be.visible');
    this.getPostalCodeInput().should('be.visible');
  }

  expectStepTwoSubtotalToMatchCartItemsSum(): void {
    this.getStepTwoItemPrices().then(($prices) => {
      const itemsPriceSum = $prices.toArray().reduce((acc, el) => acc + this.parseCurrencyAmount(el.innerText), 0);
      this.getSubtotal()
        .invoke('text')
        .then((subtotalTxt) => {
          const subtotal = this.parseCurrencyAmount(subtotalTxt);
          expect(itemsPriceSum).to.be.closeTo(subtotal, 0.02);
        });
    });
  }

  expectStepTwoTotalToMatchSubtotalPlusTax(): void {
    this.getSubtotal()
      .invoke('text')
      .then((subtotalTxt) => {
        const subtotal = this.parseCurrencyAmount(subtotalTxt);
        this.getTax()
          .invoke('text')
          .then((taxTxt) => {
            const tax = this.parseCurrencyAmount(taxTxt);
            this.getTotal()
              .invoke('text')
              .then((totalText) => {
                const total = this.parseCurrencyAmount(totalText);
                expect(total).to.be.closeTo(subtotal + tax, 0.02);
              });
          });
      });
  }

  // #endregion

  // #region Private

  private getFirstNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="firstName"]');
  }

  private getLastNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="lastName"]');
  }

  private getPostalCodeInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="postalCode"]');
  }

  private getContinueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="continue"]');
  }

  private getSubtotal(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="subtotal-label"]');
  }

  private getTax(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="tax-label"]');
  }

  private getTotal(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="total-label"]');
  }

  private getBackToProductsButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="back-to-products"]');
  }

  /**
   * Parses the currency amount.
   * @param text - e.g. 'Item total: $12.34' or '$12.34'.
   * @returns - 12.34, or 0 if no match.
   */
  private parseCurrencyAmount(text: string): number {
    const priceRegex = /\d+(?:[.,]\d+)?/;
    const match = text.match(priceRegex);
    if (match) {
      return parseFloat(match[0]);
    }

    return 0;
  }

  // #endregion
}
