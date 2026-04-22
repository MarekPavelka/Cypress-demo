import { parsePriceText } from '../support/helpers';

const PRICE_FLOAT_PRECISION = 0.02;

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
      const itemsPriceSum = $prices.toArray().reduce((acc, el) => acc + parsePriceText(el.innerText), 0);
      this.getSubtotal()
        .invoke('text')
        .then((subtotalTxt) => {
          const subtotal = parsePriceText(subtotalTxt);
          expect(itemsPriceSum).to.be.closeTo(subtotal, PRICE_FLOAT_PRECISION);
        });
    });
  }

  expectStepTwoTotalToMatchSubtotalPlusTax(): void {
    this.getSubtotal()
      .invoke('text')
      .then((subtotalTxt) => {
        const subtotal = parsePriceText(subtotalTxt);
        this.getTax()
          .invoke('text')
          .then((taxTxt) => {
            const tax = parsePriceText(taxTxt);
            this.getTotal()
              .invoke('text')
              .then((totalText) => {
                const total = parsePriceText(totalText);
                expect(total).to.be.closeTo(subtotal + tax, PRICE_FLOAT_PRECISION);
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

  // #endregion
}
