/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self-register EULA', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display EULA modal', () => {
        cy.contains('Register now').click();
        cy.contains('License Agreement');
    });

    it('should allow user to accept EULA agreement', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to create account without accept EULA', () => {
        cy.contains('Register now').click();
        cy.contains('Next').should('be.disabled');
    });
});
