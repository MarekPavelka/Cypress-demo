/// <reference types="cypress" />

import { LoginPage } from '../pages/login.page';
import { ROUTES } from './routes';

const SESSION_LOGIN_COOKIE = 'session-username';

Cypress.Commands.add('loginUi', (): void => {
  cy.session(
    'standard_user',
    () => {
      cy.env(['username', 'password']).then((credentials) => {
        const username = (credentials.username as string) ?? '';
        const password = (credentials.password as string) ?? '';
        const loginPage = new LoginPage();
        cy.visit('/');
        loginPage.login(username, password);
        cy.url().should('include', ROUTES.inventory);
        cy.getCookie(SESSION_LOGIN_COOKIE).its('value').should('eq', username);
      });
    },
    { cacheAcrossSpecs: true },
  );

  cy.visit(ROUTES.inventory, { failOnStatusCode: false });
  cy.url().should('include', ROUTES.inventory);
});

Cypress.Commands.add('loginWithEnvCredentials', (): void => {
  const loginPage = new LoginPage();
  cy.env(['username', 'password']).then((credentials) => {
    const user = (credentials.username as string) ?? '';
    const pass = (credentials.password as string) ?? '';
    loginPage.login(user, pass);
    cy.url().should('include', ROUTES.inventory);
    cy.getCookie(SESSION_LOGIN_COOKIE).its('value').should('eq', user);
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginUi(): void;
      loginWithEnvCredentials(): void;
    }
  }
}

export {};
