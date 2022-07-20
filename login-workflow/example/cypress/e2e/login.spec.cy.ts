/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('login authentication actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should authenticate with valid id', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Edit src');
    });

    it('should display enter a valid email', () => {
        cy.get('#email').click().type('test.com');
        cy.get('#password').click();
        cy.get('#email-helper-text').should('contain', 'Please enter a valid email');
        cy.contains('Log In').should('be.disabled');
    });

    it('should toggle password visibility on-off', () => {
        cy.get('#password').click().type('Test321!');
        cy.get('[data-testid="VisibilityOffIcon"]').click();
        cy.get('#password')
        .invoke('prop','type')
        .should('contain', 'text')
        cy.get('[data-testid="VisibilityIcon"]').click();
        cy.get('#password')
        .invoke('prop','type')
        .should('contain', 'password')
    });

    it('should remember me', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Remember Me').click();
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Log Out').should('be.enabled').click();
        cy.getLocalStorage('remember_me_data').should('equal', '{"user":"test@test.com","rememberMe":true}');
    });

    it('should remember me on refresh', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Remember Me').click();
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Log Out').should('be.enabled').click();
        cy.reload();
        cy.getLocalStorage('remember_me_data').should('equal', '{"user":"test@test.com","rememberMe":true}');
    });

    it('should not remember me', () => {
        cy.get('#email').click().type('test@test.com');
        cy.get('#password').click().type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.contains('Log Out').should('be.enabled').click();
        cy.getLocalStorage('remember_me_data').should('equal', '{"user":"","rememberMe":false}');
    });
});
