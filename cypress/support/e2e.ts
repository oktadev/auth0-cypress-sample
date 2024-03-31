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

function loginViaAuth0Ui(username: string, password: string) {
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
}
  
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
    const log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    });
    log.snapshot('before');

    loginViaAuth0Ui(username, password);

    log.snapshot('after');
    log.end();
})

Cypress.Commands.add(
  'loginToAuth0ViaSocial',
  (SOCIAL_PROVIDER: 'linkedin' ) => {
    const log = Cypress.log({
      displayName: 'Social LOGIN',
      message: [`🔐 Authenticating | ${SOCIAL_PROVIDER}`],
      // @ts-ignore
      autoEnd: false,
    });
    log.snapshot('before');

    switch (SOCIAL_PROVIDER) {
      case 'linkedin':
          logIntoLinkedIn(
          Cypress.env('lnkdn_user'),
          Cypress.env('lnkdn_pwd')
        );
        break
      default:
        throw new Error('no social provider configured!');
    }

    log.snapshot('after');
    log.end();
  }
)

function logIntoLinkedIn(username: string, password: string) {
  cy.origin(Cypress.env('auth0_domain'), () => {
    cy.get('form[data-provider="linkedin"]').submit();
  })

  cy.origin(
    'https://www.linkedin.com/uas/login',
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      cy.get('#username').type(username);
      cy.get('#password').type(password, {
        log: false,
      });
      cy.get('[type="submit"]').click();
    }
  );
}