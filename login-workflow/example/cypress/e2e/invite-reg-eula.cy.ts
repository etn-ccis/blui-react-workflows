/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register EULA', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-register-by-invite-route?code=DEBUG_VALIDATION_CODE_DEADBEEF');
    });

    it('should display EULA modal', () => {
        cy.contains('License Agreement');
        cy.contains('THIS EULA IS ONLY BETWEEN');
    });

    it('should allow user to accept EULA agreement', () => {
        cy.get('[type="checkbox"]').check();
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to create account without accept EULA', () => {
        cy.contains('Next').should('be.disabled');
    });
});