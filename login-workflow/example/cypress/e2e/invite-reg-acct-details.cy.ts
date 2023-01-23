/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register account details', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-register-by-invite-route?code=DEBUG_VALIDATION_CODE_DEADBEEF');
    });

    it('should display account details modal', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Account Details');
    });

    it('should allow user to submit account details', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Next').should('be.enabled').click();
        cy.get('[data-testid="blui-empty-state-root"]').should('contain', 'Welcome, fName lName');
    });

    it('should not allow user to submit invalid account details', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#first').click().type('fName');
        cy.contains('Next').should('be.disabled');
    });
});
