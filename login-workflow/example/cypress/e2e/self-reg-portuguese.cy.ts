/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('Language portuguese', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display self register in portuguese', () => {
        cy.contains('Change Language-PT').click();
        cy.contains('Criar Conta').click();
        cy.contains('Licença');
        cy.contains('Li e concordo com os Termos e Condições');
        cy.get('[type="checkbox"]').check();
        cy.contains('Próximo').should('be.enabled').click();
        cy.contains('Criar conta');
        cy.get('#email-label').should('contain', 'E-mail');
        cy.get('#email').type('test@test.com');
        cy.contains('Próximo').should('be.enabled').click();
        cy.contains('Verificar E-mail');
        cy.get('#code-label').should('contain', 'Código de verificação');
        cy.get('#code').click().type('123');
        cy.contains('Envie novamente').click();
        cy.contains('Próximo').should('be.enabled').click();
        cy.contains('Criar palavra-passe');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Próximo').should('be.enabled').click();
        cy.contains('Detalhes de conta');
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Próximo').should('be.enabled').click();
        cy.contains('Conta criada!');
    });
});
