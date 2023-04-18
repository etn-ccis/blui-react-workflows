/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('Language english', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display self register in english', () => {
        cy.contains('Change Language-EN').click();
        cy.contains('Register now!').click();
        cy.contains('License Agreement');
        cy.contains('I have read and agree to the Terms & Conditions');
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create an Account');
        cy.get('#email-label').should('contain', 'Email Address');
        cy.get('#email').type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Verify Email');
        cy.get('#code-label').should('contain', 'Verification Code');
        cy.get('#code').click().type('123');
        cy.contains('Send Again').click();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Account Details');
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Account Created!');
    });
});
