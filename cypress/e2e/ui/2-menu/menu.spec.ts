/// <reference types="cypress" />

import { pom } from '../../../support/pageManager';
import { ROUTES } from '../../../support/routes';

describe('Menu test suite', () => {
  const loginPage = pom.getLoginPage();
  const headerPage = pom.getHeaderPage();
  const homePage = pom.getHomePage();
  const username = ''
  const password = '';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login(username, password);
    cy.url().should('include', ROUTES.inventory);
  });

  describe('Menu open/close and menu items availability', () => {
    it('MNU-001: should open the burger menu from the inventory page', () => {
      headerPage.openMenu();
      headerPage.getAllMenuAnchors().each(($a) => {
        cy.wrap($a).should('be.visible');
      });
      headerPage.getCloseMenuButton().should('be.visible');
    });

    it('MNU-002: should close the menu with the X control and keep inventory page visible', () => {
      headerPage.openMenu();
      headerPage.getCloseMenuButton().should('be.visible').click();
      headerPage.getAllMenuAnchors().should('not.be.visible');
      cy.url().should('include', ROUTES.inventory);
      headerPage.getOpenMenuButton().should('be.visible');
    });

    it('MNU-003: should show all menu items in the menu', () => {
      const menuAllItemsTxt = 'All Items';
      const menuAboutTxt = 'About';
      const menuLogoutTxt = 'Logout';
      const menuResetAppStateTxt = 'Reset App State';

      headerPage.openMenu();
      headerPage.getAllMenuAnchors().should('be.visible').and('contain.text', menuAllItemsTxt);
      headerPage.getMenuAboutAnchor().should('be.visible').and('contain.text', menuAboutTxt);
      headerPage.getMenuLogoutAnchor().should('be.visible').and('contain.text', menuLogoutTxt);
      headerPage.getMenuResetAppAnchor().should('be.visible').and('contain.text', menuResetAppStateTxt);
    });
  });

  describe('Menu item - About', () => {
    const aboutLinkUrlRegex = /saucelabs\.com/i;

    it('MNU-005: should open the Sauce Labs site from About', () => {
      headerPage.openMenu();
      headerPage.getMenuAboutAnchor().should('have.attr', 'href').and('match', aboutLinkUrlRegex);
      headerPage.getMenuAboutAnchor().invoke('removeAttr', 'target').click(); // removed opening in a new tab (cy single-tab constraint)
      cy.url().should('match', aboutLinkUrlRegex);
    });
  });

  describe('Menu item - Logout', () => {
    it('MNU-006: should log out and return to the login page', () => {
      headerPage.openMenu();
      headerPage.getMenuLogoutAnchor().click();
      cy.url().should('not.include', ROUTES.inventory);
      loginPage.getUsernameInput().should('be.visible');
      loginPage.getLoginButton().should('be.visible');
    });

    it('MNU-007: should allow logging in again after logout', () => {
      headerPage.openMenu();
      headerPage.getMenuLogoutAnchor().click();
      loginPage.login(username, password);
      cy.url().should('include', ROUTES.inventory);
    });
  });

  describe('Menu item - Reset App State', () => {
    it('MNU-008: should clear cart state when Reset App State is used', () => {
      homePage.addFirstProductToCart();
      headerPage.getCartBadge().should('be.visible').and('have.text', '1');
      headerPage.resetAppState();
      headerPage.getCartBadge().should('not.exist');
    });

    it('MNU-009: should keep the user logged in after Reset App State', () => {
      homePage.addFirstProductToCart();
      headerPage.resetAppState();
      cy.url().should('include', ROUTES.inventory);
      headerPage.getCloseMenuButton().should('be.visible');
      headerPage.getMenuLogoutAnchor().should('be.visible');
    });
  });
});
