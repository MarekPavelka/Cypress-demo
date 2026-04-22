/// <reference types="cypress" />

import { pom } from '../../../support/ui/pageManager';
import { UI_ROUTES } from '../../../support/ui/routes';

describe('Login test suite', { tags: '@ui' }, () => {
  const loginPage = pom.getLoginPage();
  const wrongUsername = 'wrong_user';
  const wrongPassword = 'wrong_password';

  let username: string;
  let password: string;

  before(() => {
    cy.env(['username', 'password']).then((credentials) => {
      username = credentials.username ?? '';
      password = credentials.password ?? '';
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Login with valid credentials', () => {
    it('LGN-001: should show login form with username, password, and login button', () => {
      loginPage.getUsernameInput().should('be.visible');
      loginPage.getPasswordInput().should('be.visible');
      loginPage.getLoginButton().should('be.visible').and('be.enabled');
    });

    it('LGN-002: should log in with valid credentials and open inventory page', () => {
      loginPage.login(username, password);
      cy.url().should('include', UI_ROUTES.inventory);
    });
  });

  describe('Login with invalid credentials', () => {
    const errTxt = 'Username and password do not match any user in this service';

    it('LGN-005: should reject invalid username with valid password', () => {
      loginPage.login(wrongUsername, password);
      loginPage.getErrorMessage().should('be.visible').and('contain.text', errTxt);
      cy.url().should('not.include', UI_ROUTES.inventory);
    });

    it('LGN-006: should reject valid username with invalid password', () => {
      loginPage.login(username, wrongPassword);
      loginPage.getErrorMessage().should('be.visible').and('contain.text', errTxt);
      cy.url().should('not.include', UI_ROUTES.inventory);
    });

    it('LGN-007: should reject invalid username and invalid password', () => {
      loginPage.login(wrongUsername, wrongPassword);
      loginPage.getErrorMessage().should('be.visible').and('contain.text', errTxt);
      cy.url().should('not.include', UI_ROUTES.inventory);
    });
  });

  describe('Login with missing credentials', () => {
    const usernameErrTxt = 'Username is required';
    const pwErrTxt = 'Password is required';

    it('LGN-008: should require username when both fields are empty', () => {
      loginPage.fillCredentials('', '');
      loginPage.submit();
      loginPage.getErrorMessage().should('be.visible').and('contain.text', usernameErrTxt);
    });

    it('LGN-009: should require username when password is filled', () => {
      loginPage.fillCredentials('', password);
      loginPage.submit();
      loginPage.getErrorMessage().should('be.visible').and('contain.text', usernameErrTxt);
    });

    it('LGN-010: should require password when username is filled', () => {
      loginPage.fillCredentials(username, '');
      loginPage.submit();
      loginPage.getErrorMessage().should('be.visible').and('contain.text', pwErrTxt);
    });
  });

  describe('Access inventory page without successful login', () => {
    const errText = `You can only access '${UI_ROUTES.inventory}' when you are logged in.`;

    it('LGN-SES-001: should not allow direct inventory access without a session', () => {
      const baseUrl = Cypress.config('baseUrl') as string;

      cy.request(baseUrl).then((response) => {
        cy.intercept('GET', `**/${UI_ROUTES.inventory}`, {
          statusCode: 200,
          body: response.body,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        });
        cy.visit(UI_ROUTES.inventory);
      });
      loginPage.getUsernameInput().should('be.visible');
      loginPage.getLoginButton().should('be.visible');
      loginPage.getErrorMessage().should('be.visible').and('contain.text', errText);
    });
  });
});
