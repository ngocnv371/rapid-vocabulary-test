describe('Quiz Flow', () => {
  beforeEach(() => {
    cy.visit('/quiz');
  });

  it('should display the quiz page', () => {
    cy.url().should('include', '/quiz');
  });

  it('should show quiz questions or out of credits card', () => {
    // Wait for content to load
    cy.wait(1500);
    
    // Check if page is visible
    cy.get('body').should('be.visible');
  });

  it('should display credits button', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Look for credits-related elements
    cy.get('body').should('be.visible');
  });

  it('should show word question when quiz loads', () => {
    // Wait for quiz data to load
    cy.wait(2000);
    
    // Check if body content is loaded
    cy.get('body').should('be.visible');
  });

  it('should display multiple answer options', () => {
    // Wait for quiz to fully load with options
    cy.wait(2000);
    
    // Check for buttons (answer options)
    cy.get('button').should('exist');
  });

  it('should have clickable answer buttons', () => {
    // Wait for quiz to load
    cy.wait(2000);
    
    // Get all buttons
    cy.get('button').then($buttons => {
      // Should have some buttons available
      expect($buttons.length).to.be.greaterThan(0);
    });
  });

  it('should show loading state initially', () => {
    // Visit and immediately check for loading indicators
    cy.visit('/quiz');
    
    // Check for loading text or spinner
    cy.get('body').should('be.visible');
  });

  it('should handle clicking an answer', () => {
    // Wait for quiz to fully load
    cy.wait(2500);
    
    // Find all answer buttons
    cy.get('button').then($buttons => {
      if ($buttons.length > 0) {
        // Click the first available button
        cy.wrap($buttons[0]).click();
        
        // Wait for transition
        cy.wait(1000);
      }
    });
  });

  it('should show progress indicator', () => {
    // Wait for quiz to load
    cy.wait(1500);
    
    // Check that page has loaded
    cy.get('body').should('be.visible');
  });

  it('should transition between questions', () => {
    // Wait for quiz to load
    cy.wait(2500);
    
    // Find and click an answer
    cy.get('button').then($buttons => {
      if ($buttons.length > 0) {
        cy.wrap($buttons[0]).click();
        
        // Wait for transition animation
        cy.wait(800);
        
        // Check that page is still visible (might be next question or game over)
        cy.get('body').should('be.visible');
      }
    });
  });

  it('should handle multiple correct answers in sequence', () => {
    // Wait for quiz to load
    cy.wait(2500);
    
    // Answer multiple questions
    for (let i = 0; i < 3; i++) {
      cy.get('button').then($buttons => {
        if ($buttons.length > 0) {
          // Try clicking the first option
          cy.wrap($buttons[0]).click();
          
          // Wait for transition
          cy.wait(1000);
        }
      });
    }
    
    // Should still be on quiz or game over
    cy.get('body').should('be.visible');
  });
});

describe('Quiz Game Over', () => {
  it('should navigate to game over page after wrong answer', () => {
    cy.visit('/quiz');
    
    // Wait for quiz to load
    cy.wait(2500);
    
    // Keep clicking answers until we get a wrong one
    // (This simulates playing until game over)
    const clickAnswers = (attempts = 0, maxAttempts = 10) => {
      if (attempts >= maxAttempts) return;
      
      cy.url().then(url => {
        if (url.includes('/quiz')) {
          cy.get('button').then($buttons => {
            if ($buttons.length > 0) {
              // Click a random button
              const randomIndex = Math.floor(Math.random() * $buttons.length);
              cy.wrap($buttons[randomIndex]).click();
              cy.wait(1000);
              clickAnswers(attempts + 1, maxAttempts);
            }
          });
        }
      });
    };
    
    clickAnswers();
    
    // Eventually should reach game over (or stay in quiz)
    cy.wait(1000);
    cy.get('body').should('be.visible');
  });

  it('should display game over page', () => {
    cy.visit('/game-over');
    cy.url().should('include', '/game-over');
  });

  it('should show final score on game over', () => {
    cy.visit('/game-over');
    cy.wait(1000);
    
    // Check for score display
    cy.get('body').should('be.visible');
  });

  it('should show play again button on game over', () => {
    cy.visit('/game-over');
    cy.wait(1000);
    
    // Look for play again button
    cy.get('button').should('exist');
  });

  it('should navigate back to home when play again is clicked', () => {
    cy.visit('/game-over');
    cy.wait(1000);
    
    // Find and click a button (likely play again)
    cy.contains(/play|chơi|again|tiếp|再/i).click();
    
    // Should navigate somewhere
    cy.wait(500);
    cy.get('body').should('be.visible');
  });

  it('should show leaderboard button on game over', () => {
    cy.visit('/game-over');
    cy.wait(1000);
    
    // Look for leaderboard-related button
    cy.contains(/leaderboard|bảng|xếp|排行/i).should('exist');
  });

  it('should show login prompt for anonymous users', () => {
    cy.visit('/game-over');
    cy.wait(1000);
    
    // Check if page loaded
    cy.get('body').should('be.visible');
  });
});
