/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('forgot password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display success screen', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('[data-test="frame"]').should('contain', 'Email Sent');
        cy.contains('Done').should('be.enabled').click();
    });

    it('should disable submit on invalid input', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#email').click().type('test@test');
        cy.contains('Okay').should('be.disabled');
    });

    it('should clear forgot password modal on navigation', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Okay').should('be.enabled');
        cy.contains('Back').should('be.enabled').click();
        cy.contains('Forgot your password?').click();
        cy.get('#email').click().should('not.contain', 'test@test.com');
    });
});
