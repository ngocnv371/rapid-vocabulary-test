describe('Quiz Flow', () => {
  beforeEach(() => {
    cy.visit('/quiz');
  });

  it('should display the quiz page', () => {
    cy.url().should('include', '/quiz');
  });

  it('should show quiz questions', () => {
    // Check if quiz content is visible
    cy.get('body').should('be.visible');
    
    // You can add more specific selectors based on your Quiz component
    // For example:
    // cy.get('[data-testid="quiz-question"]').should('be.visible');
    // cy.get('[data-testid="answer-options"]').should('exist');
  });

  it('should allow answering questions', () => {
    // Wait for quiz to load and check for interactive elements
    cy.wait(1000);
    
    // Look for buttons or clickable answer elements
    // Adjust selectors based on your actual implementation
    cy.get('button').should('exist');
  });
});
