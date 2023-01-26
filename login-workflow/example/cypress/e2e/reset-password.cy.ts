/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('reset password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-reset-password-route?code=DEBUG_VALIDATION_CODE_DEADBEEF');
    });

    it('should display modal and reset password', () => {
        cy.contains('Reset Password');
        cy.get('#password').invoke('prop', 'type').should('contain', 'password');
        cy.get('#password').click().type('Test321!');
        cy.get('[data-testid="VisibilityOffIcon"]').first().click();
        cy.get('#password').invoke('prop', 'type').should('contain', 'text');
        cy.get('#confirm').invoke('prop', 'type').should('contain', 'password');
        cy.get('#confirm').click().type('Test321!');
        cy.get('[data-testid="VisibilityOffIcon"]').click();
        cy.get('#confirm').invoke('prop', 'type').should('contain', 'text');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('[data-testid="blui-empty-state-root"]').should('contain', 'Your password was successfully reset');
        cy.contains('Done').should('be.enabled').click();
    });

    it('should disable submit on invalid input', () => {
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('test321');
        cy.contains('Okay').should('be.disabled');
    });

    it('should clear forgot password modal on navigation', () => {
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Okay').should('be.enabled');
        cy.contains('Back').should('be.enabled').click();
        cy.visit('http://localhost:3000/custom-reset-password-route?code=DEBUG_VALIDATION_CODE_DEADBEEF');
        cy.get('#password').click().should('not.contain', 'Test321!');
    });
});
