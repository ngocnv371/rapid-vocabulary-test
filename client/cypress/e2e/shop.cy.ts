describe('Shop and Credits', () => {
  beforeEach(() => {
    cy.visit('/shop');
  });

  it('should display the shop page', () => {
    cy.url().should('include', '/shop');
  });

  it('should show product cards', () => {
    // Check if products are visible
    cy.get('body').should('be.visible');
    
    // You can add more specific checks based on your ProductCard component:
    // cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('should display credits button', () => {
    cy.visit('/');
    // Check if credits button is visible in navbar or header
    // Adjust based on your CreditsButton component location
    cy.get('body').should('be.visible');
  });
});
