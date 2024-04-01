// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
  
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Origin for Multidomain
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input#username').type(username);
      cy.get('input#password').type(password, { log: false });
      cy.contains('button[value=default]', 'Continue').click();
    }
  );

  cy.url().should('contain', Cypress.config('baseUrl'));
});
