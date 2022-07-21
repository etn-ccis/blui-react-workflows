/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self register create account', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display create account modal', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create an Account');
    });

    it('should allow user to submit create account', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to submit invalid create account', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test');
        cy.contains('Next').should('be.disabled');
    });
});
