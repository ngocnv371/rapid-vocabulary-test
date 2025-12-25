describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('include', '/');
    cy.get('body').should('be.visible');
  });

  it('should navigate to different pages', () => {
    // Test navigation to various pages
    cy.visit('/quiz');
    cy.url().should('include', '/quiz');

    cy.visit('/leaderboard');
    cy.url().should('include', '/leaderboard');

    cy.visit('/profile');
    cy.url().should('include', '/profile');
  });

  it('should display the navigation bar', () => {
    cy.get('nav').should('be.visible');
  });
});
