/// <reference types="cypress" />

import { pom } from '../../../support/ui/pageManager';
import { UI_ROUTES } from '../../../support/ui/routes';

describe('Cart test suite', { tags: '@ui' }, () => {
  const headerPage = pom.getHeaderPage();
  const homePage = pom.getHomePage();
  const cartPage = pom.getCartPage();

  beforeEach(() => {
    cy.uiLogin();
  });

  describe('Cart functionality on Inventory page (add/delete) and cart badge behavior', () => {
    it('CRT-002: should not show the cart badge when the cart is empty', () => {
      headerPage.getCartBadge().should('not.exist');
    });

    it('CRT-003: should add one product, show remove button and correct cart badge number', () => {
      homePage.addProductToCart(0);
      homePage.getProductRemoveFromCartButton(0).should('be.visible');
      headerPage.getCartBadge().should('be.visible').and('have.text', '1');
    });

    it('CRT-004: should add multiple products, show remove buttons and correct cart badge number', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      headerPage.getCartBadge().should('have.text', '2');
      homePage.getProductRemoveFromCartButton(0).should('be.visible');
      homePage.getProductRemoveFromCartButton(1).should('be.visible');
    });

    it('CRT-005: should add multiple products, then remove product and decrement cart badge number', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      homePage.removeProductFromCart(0);
      homePage.getProductAddToCartButton(0).should('be.visible');
      headerPage.getCartBadge().should('have.text', '1');
    });

    it('CRT-006: should add product, then remove it and hide cart badge', () => {
      homePage.addProductToCart(0);
      homePage.removeProductFromCart(0);
      headerPage.getCartBadge().should('not.exist');
      homePage.getProductAddToCartButton(0).should('be.visible');
    });
  });

  describe('Cart functionality across pages (Inventory/Cart)', () => {
    it('CRT-007: should add multiple products on inventory page and show added products on the cart page', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      headerPage.openCart();
      cy.url().should('include', UI_ROUTES.cart);
      cartPage.getCartItemRows().should('have.length', 2);
      cartPage.getCartItemNames().should('have.length', 2);
      cartPage.getCartItemNames().each(($el) => {
        expect($el.text().trim().length).to.be.greaterThan(0);
      });
    });

    it('CRT-008: should add multiple products on inventory page, then remove product on cart page and update cart badge number', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      headerPage.openCart();
      cartPage.removeCartItem(0);
      cartPage.getCartItemRows().should('have.length', 1);
      headerPage.getCartBadge().should('have.text', '1');
    });

    it('CRT-010: should keep cart state when navigating to inventory, cart, and back', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      headerPage.getCartBadge().should('have.text', '2');
      headerPage.openCart();
      cy.url().should('include', UI_ROUTES.cart);
      cartPage.continueShopping();
      cy.url().should('include', UI_ROUTES.inventory);
      headerPage.getCartBadge().should('have.text', '2');
      homePage.getAllRemoveFromCartButtons().should('have.length', 2);
    });
  });

  describe('Cart badge functionality across pages (Inventory/Cart) ', () => {
    it('CRT-012: should keep cart badge number equal to total cart quantity', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      homePage.addProductToCart(2);
      headerPage.getCartBadge().should('have.text', '3');
      headerPage.openCart();
      cartPage.expectBadgeToMatchCartQuantities();
    });
  });

  describe('Cart refresh consistency', () => {
    it('CRT-RB-001: should keep cart badge number after refreshing the inventory page', () => {
      homePage.addProductToCart(0);
      headerPage.getCartBadge().should('have.text', '1');
      cy.reload();
      cy.url().should('include', UI_ROUTES.inventory);
      headerPage.getCartBadge().should('have.text', '1');
      homePage.getProductRemoveFromCartButton(0).should('be.visible');
    });

    it('CRT-RB-002: should keep cart contents after refreshing the cart page', () => {
      homePage.addProductToCart(0);
      homePage.addProductToCart(1);
      headerPage.openCart();
      cy.url().should('include', UI_ROUTES.cart);
      cartPage.getCartItemRows().should('have.length', 2);
      cy.reload();
      cy.url().should('include', UI_ROUTES.cart);
      cartPage.getCartItemRows().should('have.length', 2);
      headerPage.getCartBadge().should('have.text', '2');
    });
  });
});
