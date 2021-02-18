describe('landing page', () => {
  it('renders a link', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /janhesters.com/i }).should('exist');
  });
});
