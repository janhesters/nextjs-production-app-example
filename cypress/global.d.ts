/// <reference types="cypress" />

type Session = {
  email: string;
  issuer: string;
  publicAddress: string;
};

declare namespace Cypress {
  interface Chainable {
    /**
     * Logs the user in by adding a session cookie.
     */
    loginByCookie(session?: Partial<Session>): Chainable<Session>;
  }
}
