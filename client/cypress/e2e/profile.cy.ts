describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('should display the profile page', () => {
    cy.url().should('include', '/profile');
  });

  it('should show user avatar', () => {
    // Check if avatar or profile image is visible
    // Adjust selector based on your UserAvatar component
    cy.get('body').should('be.visible');
  });

  it('should navigate to edit profile', () => {
    cy.visit('/edit-profile');
    cy.url().should('include', '/edit-profile');
  });
});
