/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('change password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display change password success', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('#current-password').click().type('Test321!');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('[data-test="frame"]').should('contain', 'Your password was successfully updated!');
        cy.contains('Log In').should('be.enabled').click();
    });

    it('should toggle password visibility on', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('#current-password').click().type('Test321!');
        cy.get('[data-testid="VisibilityOffIcon"]').first().click();
        cy.get('#current-password').invoke('prop', 'type').should('contain', 'text');
        cy.get('[data-testid="VisibilityIcon"]').click();
        cy.get('#current-password').invoke('prop', 'type').should('contain', 'password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.get('[data-testid="VisibilityOffIcon"]').last().click();
        cy.get('#confirm').invoke('prop', 'type').should('contain', 'text');
    });

    it('should clear password modal on navigation', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('#current-password').click().type('Test321!');
        cy.contains('Back').should('be.enabled').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('#current-password').click().should('not.contain', 'Test321!');
    });

    it('should not submit when password checker invalid', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').click();
        cy.get('#password').click().type('test321!');
        cy.get('#confirm').type('test321!');
        cy.contains('Okay').should('be.disabled');
    });
});
