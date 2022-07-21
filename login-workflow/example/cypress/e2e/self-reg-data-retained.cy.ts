/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self reg data retained on navigation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display entry data navigating back', () => {
        cy.contains('Register now').click();
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#email').click().type('test@test.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#code').click().type('123');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Back').should('be.enabled').click();
        cy.get('#password').invoke('prop', 'type').should('contain', 'password');
        cy.get('#confirm').invoke('prop', 'type').should('contain', 'password');
        cy.contains('Back').should('be.enabled').click();
        cy.get('#code').click().invoke('prop', 'value').should('contain', '123');
        cy.contains('Back').should('be.enabled').click();
        cy.get('#email').click().invoke('prop', 'value').should('contain', 'test@test.com');
        cy.contains('Back').should('be.enabled').click();
        cy.get('[type="checkbox"]').should('be.checked');
    });
});
