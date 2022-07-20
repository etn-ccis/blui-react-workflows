/// <reference types="cypress" />

describe('login screen authentication actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should authenticate with valid id', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Edit src');
    });

    it('should not authenticate with invalid id', () => {
        cy.get('#email').click().type('test.com');
        cy.get('#password').click();
        cy.get('#email-helper-text').should('contain', 'Please enter a valid email');
        cy.contains('Log In').should('be.disabled');
    });

    it('should remember me', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Remember Me').click();
        cy.contains('Log In').should('be.enabled').click();
        cy.visit('http://localhost:3000/');
        cy.getLocalStorage('remember_me_data')
        .should('equal', '{"user":"test@test.com","rememberMe":true}');
    });
});
