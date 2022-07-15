/// <reference types="cypress" />

describe('login screen', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should authenticate with valid id', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Edit src');
    });
});
