/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Checks if forbidden methods for a route return the status code 405.
 * @param forbiddenMethods - An array of HTTP methods that should be forbidden.
 * @param route - The route under test.
 */
const validateForbiddenMethods = (
  forbiddenMethods: HttpMethod[],
  route: string,
) => {
  forbiddenMethods.forEach(method => {
    context(method, () => {
      it('returns a 405 with an error message', () => {
        cy.request({
          method: method,
          url: route,
          failOnStatusCode: false,
        }).then(response => {
          expect(response.body).to.haveOwnProperty('message');

          const actual = response.status;
          const expected = 405;

          expect(actual).to.deep.equal(expected);
        });
      });
    });
  });
};

// eslint-disable-next-line jest/no-export
export default validateForbiddenMethods;
