describe('Default Login Flow', () => {
    it('logs in', () => {
      cy.intercept('/oauth/token').as('token');

      cy.visit('/');
      cy.contains('Log in').click();

      cy.loginToAuth0(
        Cypress.env('auth0_username'),
        Cypress.env('auth0_password')
      );

      cy.wait('@token').its('response.statusCode').should('equal', 200);
      cy.get('.infobox').contains('You are logged in. Have fun!');
    });
  });
  