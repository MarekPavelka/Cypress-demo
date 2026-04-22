/// <reference types="cypress" />

import { pom } from '../../../support/ui/pageManager';
import { UI_ROUTES } from '../../../support/ui/routes';

describe('Checkout test suite', () => {
  const loginPage = pom.getLoginPage();
  const headerPage = pom.getHeaderPage();
  const homePage = pom.getHomePage();
  const cartPage = pom.getCartPage();
  const checkoutPage = pom.getCheckoutPage();
  const checkoutUser = { firstName: 'Yoel', lastName: 'Romero', postalCode: '99888' };

  const addProductsToCartAndStartCheckout = (productCount: number): void => {
    for (let index = 0; index < productCount; index++) {
      homePage.addProductToCart(index);
    }
    headerPage.openCart();
    cy.url().should('include', UI_ROUTES.cart);
    cartPage.startCheckout();
    cy.url().should('include', UI_ROUTES.checkoutStepOne);
  };

  beforeEach(() => {
    cy.uiLogin();
  });

  describe('Checkout step-one start', () => {
    it('CHK-001: should add product and start checkout', () => {
      addProductsToCartAndStartCheckout(1);
    });

    it('CHK-002: should add multiple products and start checkout', () => {
      addProductsToCartAndStartCheckout(2);
    });

    it('CHK-003: should add product, start checkout and verify personal information form', () => {
      addProductsToCartAndStartCheckout(1);
      checkoutPage.verifyStepOneFormInputsAreVisible();
    });
  });

  describe('Checkout step-one validation', () => {
    const firstNameErrTxt = 'First Name is required';
    const lastNameErrTxt = 'Last Name is required';
    const postalCodeErrTxt = 'Postal Code is required';

    beforeEach(() => {
      addProductsToCartAndStartCheckout(1);
    });

    it('CHK-004: should block step-one submit when all fields are empty', () => {
      checkoutPage.submitStepOne();
      checkoutPage.getErrorMessage().should('be.visible').and('contain.text', firstNameErrTxt);
      cy.url().should('include', UI_ROUTES.checkoutStepOne);
    });

    it('CHK-005: should require first name on step-one', () => {
      checkoutPage.fillStepOne('', checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.getErrorMessage().should('be.visible').and('contain.text', firstNameErrTxt);
      cy.url().should('include', UI_ROUTES.checkoutStepOne);
    });

    it('CHK-006: should require last name on step-one', () => {
      checkoutPage.fillStepOne(checkoutUser.firstName, '', checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.getErrorMessage().should('be.visible').and('contain.text', lastNameErrTxt);
      cy.url().should('include', UI_ROUTES.checkoutStepOne);
    });

    it('CHK-007: should require postal code on step-one', () => {
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, '');
      checkoutPage.submitStepOne();
      checkoutPage.getErrorMessage().should('be.visible').and('contain.text', postalCodeErrTxt);
      cy.url().should('include', UI_ROUTES.checkoutStepOne);
    });

    it('CHK-008: should continue to step-two with valid personal information', () => {
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      cy.url().should('include', UI_ROUTES.checkoutStepTwo);
      checkoutPage.getFinishButton().should('be.visible');
    });
  });

  describe('Checkout step-two', () => {
    beforeEach(() => {
      addProductsToCartAndStartCheckout(2);
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      cy.url().should('include', UI_ROUTES.checkoutStepTwo);
    });

    it('CHK-010: should list only products from step-one on step-two', () => {
      checkoutPage.getStepTwoCartItems().should('have.length', 2);
      checkoutPage.getStepTwoItemNames().should('have.length', 2);
      checkoutPage.getStepTwoItemPrices().its('length').should('eq', 2);
    });

    it('CHK-011: should show item total that matches the listed product prices', () => {
      checkoutPage.expectStepTwoSubtotalToMatchCartItemsSum();
    });

    it('CHK-012: should show a total that matches item total plus tax', () => {
      checkoutPage.expectStepTwoTotalToMatchSubtotalPlusTax();
    });
  });

  describe('Checkout finish', () => {
    it('CHK-013: should finish checkout and open the complete page', () => {
      addProductsToCartAndStartCheckout(1);
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.finishOrder();
      cy.url().should('include', UI_ROUTES.checkoutComplete);
    });

    it('CHK-014: should show a thank you message after completing the order', () => {
      const thanksMsgTxt = 'Thank you for your order';

      addProductsToCartAndStartCheckout(1);
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.finishOrder();
      checkoutPage.getOrderCompletedHeader().should('be.visible').and('contain.text', thanksMsgTxt);
    });

    it('CHK-015: should return to inventory from the complete page', () => {
      addProductsToCartAndStartCheckout(1);
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.finishOrder();
      checkoutPage.clickBackHome();
      cy.url().should('include', UI_ROUTES.inventory);
    });

    it('CHK-016: should clear the cart badge after a successful order', () => {
      homePage.addProductToCart(0);
      headerPage.getCartBadge().should('have.text', '1');
      headerPage.openCart();
      cartPage.startCheckout();
      checkoutPage.fillStepOne(checkoutUser.firstName, checkoutUser.lastName, checkoutUser.postalCode);
      checkoutPage.submitStepOne();
      checkoutPage.finishOrder();
      checkoutPage.clickBackHome();
      cy.url().should('include', UI_ROUTES.inventory);
      headerPage.getCartBadge().should('not.exist');
    });
  });
});
