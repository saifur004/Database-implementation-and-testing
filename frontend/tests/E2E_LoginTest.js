describe('E2E Login Flow', () => {
  it('should allow user to log in and navigate to dashboard', () => {
    try {
      cy.visit('http://localhost:3000/login');
      
      cy.get('[data-testid="email-input"]').type('testuser@example.com');
      cy.get('[data-testid="password-input"]').type('password123');
      cy.get('[data-testid="login-button"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, Test User!').should('be.visible');
    } catch (error) {
      cy.log('Test failed:', error);
      throw error;
    }
  });
});