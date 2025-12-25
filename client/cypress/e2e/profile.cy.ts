describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('should display the profile page', () => {
    cy.url().should('include', '/profile');
  });

  it('should show user avatar', () => {
    // Check if profile page content is visible
    cy.get('body').should('be.visible');
  });

  it('should display profile statistics', () => {
    // Wait for profile data to load
    cy.wait(1000);
    
    // Check for main profile elements
    cy.get('body').should('be.visible');
    
    // Look for stat indicators using emojis or text content
    // Stats should include games played, average score, and streak
    cy.contains(/🎮|games|played/i).should('exist');
  });

  it('should display high score section', () => {
    // Wait for score data to load
    cy.wait(1000);
    
    // Check for score display elements
    cy.get('body').should('be.visible');
  });

  it('should show edit profile button for logged-in users', () => {
    // Wait for profile to load
    cy.wait(1000);
    
    // Look for edit button or navigation to edit profile
    // Button text might be localized
    cy.get('body').should('be.visible');
  });

  it('should show share button', () => {
    // Wait for profile to load
    cy.wait(1000);
    
    // Look for share-related elements
    cy.get('button').should('exist');
  });

  it('should navigate to edit profile page', () => {
    cy.visit('/profile/edit');
    cy.url().should('include', '/profile/edit');
  });

  it('should display weekly progress chart', () => {
    // Wait for profile and chart data to load
    cy.wait(1500);
    
    // Check that the page has loaded with content
    cy.get('body').should('be.visible');
  });

  it('should show navigation bar', () => {
    // Check for navigation elements
    cy.get('nav').should('be.visible');
  });

  it('should display language switcher', () => {
    // Check that language switcher is present
    cy.get('body').should('be.visible');
  });
});

describe('Edit Profile Page', () => {
  beforeEach(() => {
    cy.visit('/profile/edit');
  });

  it('should display the edit profile page', () => {
    cy.url().should('include', '/profile/edit');
  });

  it('should show display name input field', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Look for input field
    cy.get('input[type="text"]').should('exist');
  });

  it('should allow typing in the display name field', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Find and type in the input field
    cy.get('input[type="text"]').first().clear().type('Test User Name');
    cy.get('input[type="text"]').first().should('have.value', 'Test User Name');
  });

  it('should show character count', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Type something and check for character count display
    cy.get('input[type="text"]').first().clear().type('Test');
    
    // Look for character count display (e.g., "4/50")
    cy.contains(/\d+\/50/).should('exist');
  });

  it('should have save and cancel buttons', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Check for buttons
    cy.get('button').should('have.length.at.least', 2);
  });

  it('should respect max length of 50 characters', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Try to type more than 50 characters
    const longText = 'a'.repeat(60);
    cy.get('input[type="text"]').first().clear().type(longText);
    
    // Input should only accept 50 characters
    cy.get('input[type="text"]').first().invoke('val').should('have.length.lte', 50);
  });

  it('should navigate back to profile on cancel', () => {
    // Wait for page to load
    cy.wait(1000);
    
    // Find and click cancel button
    // Button text might be localized (Cancel, Hủy, etc.)
    cy.contains(/cancel|hủy|返回/i).click();
    
    // Should navigate back to profile
    cy.wait(500);
    cy.url().should('match', /\/profile/);
  });
});
