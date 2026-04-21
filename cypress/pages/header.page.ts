export class HeaderPage {
  // #region Getters

  getOpenMenuButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#react-burger-menu-btn');
  }

  getCloseMenuButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#react-burger-cross-btn');
  }

  getAllMenuAnchors(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#inventory_sidebar_link');
  }

  getMenuAboutAnchor(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#about_sidebar_link');
  }

  getMenuLogoutAnchor(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#logout_sidebar_link');
  }

  getMenuResetAppAnchor(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#reset_sidebar_link');
  }

  getCartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  // #endregion

  // #region Actions

  openMenu(): void {
    this.getOpenMenuButton().click();
  }

  closeMenu(): void {
    this.getCloseMenuButton().click();
  }

  resetAppState(): void {
    this.openMenu();
    this.getMenuResetAppAnchor().click();
  }

  openCart(): void {
    this.getShoppingCartAnchor().click();
  }

  // #endregion

  // #region Private

  private getShoppingCartAnchor(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  // #endregion
}
