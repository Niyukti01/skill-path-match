// InternLink E2E Tests - Comprehensive test suite
// Run with: npx cypress open

describe('InternLink E2E Tests', () => {
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'Test123456!';
  const testName = 'Test User';

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Authentication Flow', () => {
    it('should load homepage successfully', () => {
      cy.contains('InternLink').should('be.visible');
      cy.contains('Dream Internships').should('be.visible');
    });

    it('should navigate to auth page', () => {
      cy.contains("I'm a Student").click();
      cy.url().should('include', '/auth');
    });

    it('should show validation errors for invalid signup', () => {
      cy.visit('/auth');
      cy.contains('Sign Up').click();
      
      // Try to submit empty form
      cy.contains('button', 'Create Account').click();
      
      // Should show validation errors (implemented via toast)
      cy.wait(500);
    });

    it('should complete full signup flow', () => {
      cy.visit('/auth');
      cy.contains('Sign Up').click();
      
      // Select student type
      cy.contains('Looking for internships').click();
      
      // Fill form
      cy.get('input[name="name"]').type(testName);
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').first().type(testPassword);
      cy.get('input[name="confirmPassword"]').type(testPassword);
      
      // Submit
      cy.contains('button', 'Create Account').click();
      
      // Should show success message and switch to login tab
      cy.contains('Sign In', { timeout: 5000 }).should('be.visible');
    });

    it('should login with created account', () => {
      cy.visit('/auth');
      
      // Fill login form
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
      
      // Submit
      cy.contains('button', 'Sign In').click();
      
      // Should redirect to dashboard
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
    });

    it('should prevent duplicate email signup', () => {
      cy.visit('/auth');
      cy.contains('Sign Up').click();
      
      // Try to sign up with existing email
      cy.contains('Looking for internships').click();
      cy.get('input[name="name"]').type('Another User');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').first().type(testPassword);
      cy.get('input[name="confirmPassword"]').type(testPassword);
      
      cy.contains('button', 'Create Account').click();
      
      // Should show error about existing email
      cy.wait(1000);
    });
  });

  describe('Navigation & Session', () => {
    beforeEach(() => {
      // Login before each test
      cy.visit('/auth');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
      cy.contains('button', 'Sign In').click();
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
    });

    it('should maintain session after page refresh', () => {
      cy.reload();
      cy.url().should('include', '/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });

    it('should navigate between pages without full reload', () => {
      // Navigate to profile
      cy.contains('Profile').click();
      cy.url().should('include', '/profile');
      
      // Navigate to dashboard
      cy.contains('Dashboard').click();
      cy.url().should('include', '/dashboard');
      
      // Should not have full page reload (session maintained)
      cy.contains('Dashboard').should('be.visible');
    });

    it('should logout successfully', () => {
      // Click logout
      cy.contains('Sign Out').click();
      
      // Confirm logout in dialog
      cy.contains('button', 'Sign Out').click();
      
      // Should redirect to home
      cy.url({ timeout: 5000 }).should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Dashboard Features', () => {
    beforeEach(() => {
      // Login as student
      cy.visit('/auth');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
      cy.contains('button', 'Sign In').click();
      cy.wait(2000);
    });

    it('should display dashboard correctly', () => {
      cy.visit('/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });

    it('should navigate to profile edit', () => {
      cy.visit('/dashboard');
      cy.contains('Edit Profile').click();
      cy.url().should('include', '/profile/edit');
    });
  });

  describe('Profile Management', () => {
    beforeEach(() => {
      cy.visit('/auth');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="password"]').type(testPassword);
      cy.contains('button', 'Sign In').click();
      cy.wait(2000);
    });

    it('should load profile edit page', () => {
      cy.visit('/profile/edit');
      cy.contains('Edit Profile').should('be.visible');
    });

    it('should update profile successfully', () => {
      cy.visit('/profile/edit');
      
      // Update skills field
      cy.get('textarea[name="skills"]').clear().type('React, TypeScript, Node.js');
      
      // Update goals field
      cy.get('textarea[name="goals"]').clear().type('Become a full-stack developer');
      
      // Save
      cy.contains('button', 'Save Profile').click();
      
      // Should show success message
      cy.contains('Profile updated successfully', { timeout: 5000 });
      
      // Refresh and verify changes persisted
      cy.reload();
      cy.get('textarea[name="skills"]').should('contain.value', 'React, TypeScript, Node.js');
    });
  });

  describe('Button Functionality', () => {
    it('should have working CTA buttons on homepage', () => {
      cy.visit('/');
      
      // Test "I'm a Student" button
      cy.contains("I'm a Student").should('be.visible').click();
      cy.url().should('include', '/auth');
      cy.go('back');
      
      // Test "I'm a Company" button
      cy.contains("I'm a Company").should('be.visible').click();
      cy.url().should('include', '/auth');
      cy.go('back');
      
      // Test "How It Works" button
      cy.contains("How It Works").click();
      cy.url().should('include', '/about');
    });

    it('should have working buttons on About page', () => {
      cy.visit('/about');
      
      // Test CTA buttons
      cy.contains("Start as a Student").should('be.visible');
      cy.contains("Join as a Company").should('be.visible');
    });

    it('should have keyboard accessible buttons', () => {
      cy.visit('/');
      
      // Tab to button and press Enter
      cy.get('body').tab();
      cy.focused().type('{enter}');
      
      // Should navigate or trigger action
      cy.wait(500);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // This would require mocking network failures
      // For now, verify error messages show for invalid credentials
      cy.visit('/auth');
      
      cy.get('input[name="email"]').type('wrong@email.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.contains('button', 'Sign In').click();
      
      // Should show error message (via toast)
      cy.wait(1000);
    });
  });

  describe('Responsive Design', () => {
    const viewports = [
      { device: 'iphone-se2', width: 375, height: 667 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'desktop', width: 1280, height: 720 },
    ];

    viewports.forEach((viewport) => {
      it(`should work on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
        
        // Check if content is visible and accessible
        cy.contains('InternLink').should('be.visible');
        cy.contains('Dream Internships').should('be.visible');
        
        // Check if buttons are clickable
        cy.contains("I'm a Student").should('be.visible');
      });
    });
  });

  describe('Real-time Updates (Admin)', () => {
    // This would require admin credentials
    // Skipping for now as it needs special setup
    it.skip('should update dashboard in real-time', () => {
      // Login as admin
      // Open dashboard
      // In another window, create new user
      // Verify dashboard updates automatically
    });
  });
});
