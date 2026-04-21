export class LoginPage {
  // #region Getters

  getUsernameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="username"]');
  }

  getPasswordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="password"]');
  }

  getLoginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="login-button"]');
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="error"]');
  }

  // #endregion

  // #region Actions

  submit(): void {
    this.getLoginButton().click();
  }

  login(username: string, password: string): void {
    this.fillCredentials(username, password);
    this.submit();
  }

  fillCredentials(username: string, password: string): void {
    this.getUsernameInput().clear();
    this.getPasswordInput().clear();
    if (username.length > 0) {
      this.getUsernameInput().type(username);
    }
    if (password.length > 0) {
      this.getPasswordInput().type(password);
    }
  }

  // #endregion
}
