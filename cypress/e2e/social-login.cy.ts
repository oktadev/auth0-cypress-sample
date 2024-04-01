describe('Social Login Flow', () => {
    it('logs in via LinkedIn', () => {
      cy.intercept('/oauth/token').as('token');

      cy.visit('/');
      cy.contains('Log in').click();

      cy.loginToAuth0ViaSocial(Cypress.env('lnkdn_user'), Cypress.env('lnkdn_pwd'));

      cy.wait('@token').its('response.statusCode').should('equal', 200);
      cy.get('.infobox').contains('You are logged in. Have fun!');
    });
  });
  