/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self register create password', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display create password modal', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#code').click().type('123');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
    });

    it('should allow user to submit create password', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#code').click().type('123');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to submit invalid create password', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#code').click().type('123');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('test321');
        cy.get('#confirm').click().type('test321');
        cy.contains('Next').should('be.disabled');
    });
});
