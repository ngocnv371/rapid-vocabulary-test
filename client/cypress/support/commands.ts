/// <reference types="cypress" />

// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login as a user
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;
      
      /**
       * Custom command to check if user is on a specific page
       * @example cy.shouldBeOnPage('/quiz')
       */
      shouldBeOnPage(path: string): Chainable<void>;
    }
  }
}

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Check current page
Cypress.Commands.add('shouldBeOnPage', (path: string) => {
  cy.url().should('include', path);
});

export {};
