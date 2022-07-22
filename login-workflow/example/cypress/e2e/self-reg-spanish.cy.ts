/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('Language spanish', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display self register in spanish', () => {
        cy.contains('Change Language-ES').click();
        cy.contains('Recordar contraseña');
        cy.contains('Iniciar sesión');
        cy.contains('¡Regístrate ahora!').click();
        cy.get('.MuiCardHeader-root').should('contain', 'Acuerdo de licencia');
        cy.contains('He leído y acepto los Términos y condiciones');
        cy.get('[type="checkbox"]').check();
        cy.contains('Siguiente').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', 'Crear una cuenta');
        cy.get('#email-label').should('contain', 'Correo electrónico');
        cy.get('#email').type('test@test.com');
        cy.contains('Siguiente').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', 'Verificar correo electrónico');
        cy.get('#code-label').should('contain', 'Código de verificación');
        cy.get('#code').click().type('123');
        cy.contains('Reenviar correo electrónico de verificación').should('be.enabled').click();
        cy.contains('Siguiente').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', 'Crear contraseña');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('Siguiente').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', 'Detalles de la cuenta');
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('Siguiente').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '¡Cuenta creada!');
        cy.contains('Seguir').should('be.enabled').click();
    });
});
