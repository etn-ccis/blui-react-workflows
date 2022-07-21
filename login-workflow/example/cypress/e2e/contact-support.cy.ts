/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('login authentication actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display contact us modal', () => {
        cy.contains('Contact an Eaton').click();
        cy.contains('Contact Us')
    });

    it('should display login page when contact us is selected', () => {
        cy.contains('Contact an Eaton').click();
        cy.contains('Okay').should('be.enabled').click();
    });
});