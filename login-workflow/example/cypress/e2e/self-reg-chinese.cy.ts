/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('Language spanish', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/custom-login-route');
    });

    it('should display self register in chinese', () => {
        cy.contains('Change Language-ZH').click();
        cy.contains('创建账号').click();
        cy.get('.MuiCardHeader-root').should('contain', '许可协议');
        cy.contains('我已阅读并同意条款及细则');
        cy.get('[type="checkbox"]').check();
        cy.contains('下一步').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '创建账号');
        cy.get('#email-label').should('contain', '邮箱地址');
        cy.get('#email').type('test@test.com');
        cy.contains('下一步').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '验证邮箱');
        cy.get('#code-label').should('contain', '验证码');
        cy.get('#code').click().type('123');
        cy.contains('重新发送验证邮件').should('be.enabled').click();
        cy.contains('下一步').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '创建密码');
        cy.get('#password').click().type('Test321!');
        cy.get('#confirm').click().type('Test321!');
        cy.contains('下一步').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '账号信息');
        cy.get('#first').click().type('fName');
        cy.get('#last').click().type('lName');
        cy.contains('下一步').should('be.enabled').click();
        cy.get('.MuiCardHeader-root').should('contain', '成功建立账号！');
        cy.get('.MuiButton-root').should('contain', '继续').click();
    });
});
