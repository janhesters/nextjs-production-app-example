import { extractCookies } from 'utils/extract-cookies';

import validateForbiddenMethods from '../support/utils';

const getCurrentUserRoute = `/api/user`;
const loginRoute = `/api/login`;

// TODO: Login and logout using the UI, as well as logout using the API.
// Depends on Magic updates coming Q2 2021.

describe('get current user handler', () => {
  context('GET', () => {
    it('returns a 200 with the user when the user is logged in', () => {
      cy.loginByCookie().then(session => {
        cy.request(getCurrentUserRoute).then(response => {
          expect(response.status).to.equal(200);

          const actual = response.body;
          const expected = { user: session };

          expect(actual).to.deep.equal(expected);
        });
      });
    });

    it('returns null if the user is logged out', () => {
      cy.request(getCurrentUserRoute).then(response => {
        expect(response.status).to.equal(200);

        const actual = response.body;
        // eslint-disable-next-line unicorn/no-null
        const expected = { user: null };

        expect(actual).to.deep.equal(expected);
      });
    });
  });

  validateForbiddenMethods(['POST', 'PUT', 'DELETE'], getCurrentUserRoute);
});

describe('login handler', () => {
  context('GET', () => {
    it('returns a 200 and logs the user in with a valid token', () => {
      cy.request({
        url: loginRoute,
        auth: { bearer: Cypress.env('validToken') },
      }).then(response => {
        expect(response.status).to.equal(200);
        const magicToken = extractCookies(response.headers)['magic-auth-token'];
        expect(magicToken.value.length).to.equal(420);
        expect(response.body).to.deep.equal({ done: true });
      });
    });

    it('returns a 400 when a valid token is included wrongly', () => {
      cy.request({
        url: loginRoute,
        headers: { Authorization: Cypress.env('validToken') },
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(400);

        const actual = response.body;
        const expected = {
          message:
            "Malformed authorization header. It should be: 'Bearer ${token}'.",
        };

        expect(actual).to.deep.equal(expected);
      });
    });

    it('returns a 400 when the token is missing', () => {
      cy.request({
        url: loginRoute,
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(400);

        const actual = response.body;
        const expected = { message: 'No token found in request.' };

        expect(actual).to.deep.equal(expected);
      });
    });

    it('returns a 400 when the token is malformed', () => {
      const malformedDidToken = 'abc-123';

      cy.request({
        url: loginRoute,
        auth: { bearer: malformedDidToken },
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(400);

        const actual = response.body;
        const expected = {
          message: 'Malformed token. Please include a valid DID token.',
        };

        expect(actual).to.deep.equal(expected);
      });
    });

    it('returns a 401 when the token is invalid', () => {
      const invalidDidToken =
        'WyIweGUxN2U2MTk0M2Q0NTdiOWQ4NmJhMTRiNWU4YjkxMmZkNjRlMDY3ZThiMWNmOGIzZGM0ZDcxOTNkNTA4YmE1MTE3ZjRhNjY2NWYwMzhjM2YwZjg5ODRjNTZkMTY0OWRmYmJmMjg2MjNkMjM0ZDY1Zjc0NjAwYWY2M2YzNDI0NDdjMWIiLCJ7XCJpYXRcIjoxNjEwNDkxNjM2LFwiZXh0XCI6MS4wMDAwMDAwMDAwMDE2MTA1ZSsyMSxcImlzc1wiOlwiZGlkOmV0aHI6MHg3RjBBN2I4OTAzMUU0NzFiODNmMmJhRTFBZkFFOTEwYzA1MDQ0NEFDXCIsXCJzdWJcIjpcIjJUTWoxMFZSb1JfU0t0eEpheVhyME8wUEdNUEw3Sjl1RjlOV2dDdWwySkE9XCIsXCJhdWRcIjpcIjhUZUNjSWxWVWtuaG1HME5yVmlqZkVqRnJvOU9VRDBZam1td0twYkQ0MFE9XCIsXCJuYmZcIjoxNjEwNDkxNjM2LFwidGlkXCI6XCJlMDlmZWJkZC1jNzRlLTRhY2EtYjk1MC05MTAwZjJjNjI5OGVcIixcImFkZFwiOlwiMHhmOGIwMmRlYTRiZDhhMzZhMjA3YjA5MWIxNjNjNzQ5NzE3YmJkMWM1NjgyZGU0MDJlODhiY2JiZmNjZTQ0YjZmNjUzYWVlM2EwZGIzNDA4OWM3NDBmZjFmYTMwZDI4ZDU1NjNiODMzYzk2Mzc0NmQ2NzNmYTI3MTJiOGVlMjY4NDFiXCJ9Il0';

      cy.request({
        url: loginRoute,
        auth: { bearer: invalidDidToken },
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.equal(401);

        const actual = response.body;
        const expected = { message: 'Not authorized' };

        expect(actual).to.deep.equal(expected);
      });
    });
  });

  validateForbiddenMethods(['POST', 'PUT', 'DELETE'], loginRoute);
});
