describe('Social Login Flow', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.loginViaAPI(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    );
  })

  it('logs in via LinkedIn', () => {
    cy.intercept('/oauth/token').as('token');

    cy.wait('@token').its('response.statusCode').should('equal', 200);
    cy.get('.infobox').contains('You are logged in. Have fun!');
  });
});
  