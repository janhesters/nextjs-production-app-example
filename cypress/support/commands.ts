/* eslint-disable jest/valid-expect */
// ***********************************************
// For more on custom commands visit:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@testing-library/cypress/add-commands';

Cypress.Commands.add(
  'loginByCookie',
  ({
    issuer = 'did:example:123456789abcdefghi',
    publicAddress = '0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E',
    email = 'jan@janhesters.com',
  } = {}) => {
    const session = { issuer, publicAddress, email };

    return cy.task<string>('encryptSession', session).then(token => {
      return cy.setCookie('magic-auth-token', token).then(() => {
        return session;
      });
    });
  },
);
