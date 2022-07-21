/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self register verify email', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display verify email modal', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Verify Email');
    });

    it('should allow user to submit verify email', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#code').click().type('123');
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to submit verify email', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Next').should('be.disabled');
    });
});
