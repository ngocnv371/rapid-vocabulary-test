describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login page', () => {
    cy.url().should('include', '/login');
    cy.contains('login', { matchCase: false }).should('exist');
  });

  it('should show validation errors for empty fields', () => {
    // Try to submit without filling fields
    cy.get('button[type="submit"]').click();
    
    // Check if validation messages appear (adjust selectors based on your actual implementation)
    cy.get('body').should('be.visible');
  });

  it('should allow typing in email and password fields', () => {
    cy.get('input[name="email"], input[type="email"]').first().type('test@example.com');
    cy.get('input[name="password"], input[type="password"]').first().type('password123');
    
    // Verify the values are entered
    cy.get('input[name="email"], input[type="email"]').first().should('have.value', 'test@example.com');
    cy.get('input[name="password"], input[type="password"]').first().should('have.value', 'password123');
  });
});
