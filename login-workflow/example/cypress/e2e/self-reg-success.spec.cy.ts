/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self register successful registration', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display log in when successful registration completes', () => {
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
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Next').should('be.enabled').click();
        cy.get('[data-test="frame"]').should('contain', 'Welcome, fName lName');
        cy.contains('Continue').should('be.enabled').click();
        cy.contains('Log In');
    });
});
