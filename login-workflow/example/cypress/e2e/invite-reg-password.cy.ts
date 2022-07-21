/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register create password', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-register-by-invite-route?code=DEBUG_VALIDATION_CODE_DEADBEEF');
    });

    it('should display create password modal', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
    });

    it('should allow user to submit create password', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to submit invalid create password', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('test321');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.disabled');
    });
});
