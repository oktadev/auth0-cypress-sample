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
})

Cypress.Commands.add( 'loginToAuth0ViaSocial', (username: string, password: string) => {
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
);

Cypress.Commands.add("loginViaAPIold", (username,password) => {
  var jwt = require('jsonwebtoken');
  cy.clearLocalStorage();

  const client_id = Cypress.env('auth0_client_id');
  const client_secret = Cypress.env('auth0_client_secret');
  const audience = Cypress.env('auth0_audience');
  const scope = Cypress.env('auth0_scope');


  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
    body: {
      grant_type: 'password',
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  })
  .then((resp) => {
    return resp.body;
  })
  .then((body) => {
    const {access_token, expires_in, id_token} = body;
    const auth0State = {
      nonce: '',
      state: 'some-random-state'
    };
    const callbackUrl = `#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
    cy.visit(callbackUrl, {
      onBeforeLoad(win) {
        win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
      }
    });
  })
});

Cypress.Commands.add("loginToken", (overrides = {}) => {
  const options = {
    method: "POST",
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
    body: {
      grant_type: "password",
      username: Cypress.env("auth0_username"),
      password: Cypress.env("auth0_password"),
      audience: Cypress.env('auth0_audience'),
      scope: Cypress.env('auth0_scope'),
      client_id: Cypress.env('auth0_client_id'),
      client_secret: Cypress.env('auth0_client_secret'),
    },
  };

  cy.request(options).then((resp) => {
    const { id_token } = resp.body;
    cy.request({ // this is the crucial part. Passing id_token to callback endpoint 
      method: "POST", // callback endpoint sets the session cookie which is picked up by cypress and used to authenticate subsequent requests
      url: `${Cypress.env('auth0_domain')}/`,
      body: { id_token }, // Must pass only the access_token. Passing full response from oauth causes the 'missing at_hash error'
    });
  });
});

Cypress.Commands.add("loginViaAPIauthorize", (username,password) => {
  var jwt = require('jsonwebtoken');
  cy.clearLocalStorage();

  const client_id = Cypress.env('auth0_client_id');
  const client_secret = Cypress.env('auth0_client_secret');
  const audience = Cypress.env('auth0_audience');
  const scope = Cypress.env('auth0_scope');


  cy.request(`https://${Cypress.env('auth0_domain')}/authorize?response_type=token&client_id=${client_id}&redirect_uri=${Cypress.config('baseUrl')}callback&scope=${Cypress.env('auth0_scope')}&audience=${Cypress.env('auth0_audience')}&state=xyzABC123`)
  .then((resp) => {
    console.log(resp);
    
    return resp.body;
  })
});

Cypress.Commands.add("loginViaAPI", (username,password) => {
  var jwt = require('jsonwebtoken');
  cy.clearLocalStorage();

  const client_id = Cypress.env('auth0_client_id');
  const client_secret = Cypress.env('auth0_client_secret');
  const audience = Cypress.env('auth0_audience');
  const scope = Cypress.env('auth0_scope');

  cy.clearLocalStorage();

  cy.log('getting tokens');
  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
    body: {
      grant_type: 'password',
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  }).then((body) => {

    const { access_token, expires_in, id_token } = body;

    const auth0State = {
      nonce: '',
      state: 'some-random-state'
    };
    const callbackUrl = `#access_token=${body.body.access_token}&scope=openid&id_token=${body.body.id_token}&expires_in=${body.body.expires_in}&token_type=Bearer&state=${auth0State.state}`;
    cy.visit(callbackUrl, {
      onBeforeLoad(win) {
        win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
      }
    });
  })
});
