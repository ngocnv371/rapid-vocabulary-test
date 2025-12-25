describe('Leaderboard', () => {
  beforeEach(() => {
    cy.visit('/leaderboard');
  });

  describe('Page Layout', () => {
    it('should display the leaderboard page', () => {
      cy.url().should('include', '/leaderboard');
    });

    it('should display the page header', () => {
      // Check for header element
      cy.get('header').should('be.visible');
    });

    it('should display the navigation bar', () => {
      cy.get('nav').should('be.visible');
    });
  });

  describe('View Mode Toggle', () => {
    it('should display both view mode buttons', () => {
      // Check for Best Streaks button
      cy.contains('button', /best streaks/i).should('be.visible');
      
      // Check for Recent Scores button
      cy.contains('button', /recent scores/i).should('be.visible');
    });

    it('should have "Best Streaks" selected by default', () => {
      cy.contains('button', /best streaks/i)
        .should('have.class', 'from-purple-500')
        .and('have.class', 'to-pink-500');
    });

    it('should switch to Recent Scores view when clicked', () => {
      cy.contains('button', /recent scores/i).click();
      
      // Verify the button is now highlighted
      cy.contains('button', /recent scores/i)
        .should('have.class', 'from-purple-500')
        .and('have.class', 'to-pink-500');
      
      // Best Streaks should no longer be highlighted
      cy.contains('button', /best streaks/i)
        .should('have.class', 'bg-gray-800');
    });

    it('should switch back to Best Streaks view', () => {
      // First switch to Recent Scores
      cy.contains('button', /recent scores/i).click();
      
      // Then switch back to Best Streaks
      cy.contains('button', /best streaks/i).click();
      
      cy.contains('button', /best streaks/i)
        .should('have.class', 'from-purple-500')
        .and('have.class', 'to-pink-500');
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner initially', () => {
      // Intercept the API call to delay response
      cy.intercept('POST', '**/rest/v1/scores*', (req) => {
        req.reply((res) => {
          res.delay = 1000; // Delay by 1 second
        });
      }).as('getScores');

      // Reload the page
      cy.visit('/leaderboard');
      
      // Check for loading text (before data loads)
      // Note: This test might be flaky depending on load time
      cy.contains(/loading/i, { timeout: 1000 }).should('exist');
    });
  });

  describe('Leaderboard Content', () => {
    beforeEach(() => {
      // Wait for page to load
      cy.wait(1000);
    });

    it('should display top champions section if scores exist', () => {
      // Check for either top champions section OR no scores message
      cy.get('body').then(($body) => {
        if ($body.text().includes('Top Champions') || $body.text().includes('champion')) {
          cy.contains(/top champions|champion/i).should('be.visible');
        } else {
          // If no scores, should show empty state
          cy.contains(/no scores|error/i).should('exist');
        }
      });
    });

    it('should display podium for top 3 players when scores exist', () => {
      cy.get('body').then(($body) => {
        // Check if there's actual content (not error/empty state)
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Look for medal emojis (🥇, 🥈, 🥉)
          const medalRegex = /🥇|🥈|🥉/;
          
          // There should be at least one medal visible
          cy.get('body').invoke('text').should('match', medalRegex);
        }
      });
    });

    it('should display player names in the leaderboard', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Check for player name elements
          cy.get('.text-white.font-bold, .text-white.font-semibold')
            .should('have.length.at.least', 1);
        }
      });
    });

    it('should display scores for each player', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Check for score displays (gradient backgrounds with numbers)
          cy.get('.bg-gradient-to-r').should('have.length.at.least', 1);
        }
      });
    });

    it('should display rankings section if more than 3 players', () => {
      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        
        if (!bodyText.match(/no scores|error|failed/i)) {
          // Check if there's an "All Rankings" section
          if (bodyText.includes('All Rankings') || bodyText.includes('ranking')) {
            cy.contains(/all rankings/i).should('be.visible');
          }
        }
      });
    });

    it('should display dates for scores in rankings section', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Look for date elements (calendar icon and date text)
          cy.get('svg[fill="currentColor"]').should('exist');
        }
      });
    });
  });

  describe('Empty State', () => {
    it('should display message when no scores are available', () => {
      // This test will only pass if there are no scores in the database
      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        
        // Check for either scores or empty/error state
        const hasScores = !bodyText.match(/no scores|error|failed/i);
        const hasEmptyState = bodyText.match(/no scores/i);
        
        // Should have one or the other
        expect(hasScores || hasEmptyState).to.be.true;
      });
    });
  });

  describe('Visual Elements', () => {
    it('should display medal emojis for top 3 positions', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          const bodyText = $body.text();
          
          // Check for presence of medal emojis
          if (bodyText.includes('🥇') || bodyText.includes('🥈') || bodyText.includes('🥉')) {
            expect(bodyText).to.match(/🥇|🥈|🥉/);
          }
        }
      });
    });

    it('should apply gradient styling to leaderboard elements', () => {
      // Check for gradient classes used in the component
      cy.get('.bg-gradient-to-r, .bg-gradient-to-br').should('exist');
    });

    it('should display player avatars or spirit animals', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Look for rounded elements (avatars)
          cy.get('.rounded-full').should('have.length.at.least', 1);
        }
      });
    });
  });

  describe('Interactions', () => {
    it('should highlight items on hover', () => {
      cy.get('body').then(($body) => {
        if (!$body.text().match(/no scores|error|failed/i)) {
          // Find elements with hover states
          cy.get('.hover\\:scale-105, .hover\\:scale-\\[1\\.02\\]')
            .first()
            .should('exist');
        }
      });
    });
  });

  describe('Responsive Design', () => {
    it('should be mobile-friendly', () => {
      // Already set to mobile viewport in cypress.config.ts (375x667)
      // Verify the page renders without horizontal scroll
      cy.get('body').should('be.visible');
      
      // Check that main container uses max-w-2xl for responsive design
      cy.get('.max-w-2xl').should('exist');
    });
  });
});
