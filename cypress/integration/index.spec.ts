describe('english', () => {
  it('should find the h1 heading', () => {
    cy.visit('/');
    cy.findByRole('heading', { name: /William Beuil/i }).should('exist');
  });
});

describe('french', () => {
  it('should find the h1 heading', () => {
    cy.visit('/fr');
    cy.findByRole('heading', { name: /William Beuil/i }).should('exist');
  });
});
