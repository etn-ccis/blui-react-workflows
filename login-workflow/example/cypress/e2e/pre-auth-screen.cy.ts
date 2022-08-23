/// <reference types="cypress" />

describe('pre-auth guard route', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pre-auth');
    });

    it('should display guarded route page', () => {
        cy.contains('example pre-auth')
    });

    it('should have status code 200', () => {
        cy.request('http://localhost:3000/pre-auth')
        .then((resp) => {
            expect(resp.status).to.eq(200)})
    });

    it('should guard navigate to home page', () => {
        cy.contains('Navigate to Home').click();
        cy.url()
      .should('be.equal', 'http://localhost:3000/custom-login-route')
    });
});
