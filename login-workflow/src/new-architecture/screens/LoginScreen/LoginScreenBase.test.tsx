import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginScreenBase } from './LoginScreenBase';

afterEach(cleanup);

const mockLogin = jest.fn();
const mockForgotPassword = jest.fn();
const mockSelfRegister = jest.fn();
const mockContactSupport = jest.fn();

describe('LoginScreenBase', () => {
    beforeEach(() => {
        render(
            <LoginScreenBase
                onLogin={mockLogin}
                onForgotPassword={mockForgotPassword}
                onSelfRegister={mockSelfRegister}
                onContactSupport={mockContactSupport}
                usernameValidator={(username: string): string | boolean => username.length >= 3}
                passwordValidator={(password: string): string | boolean => password.length >= 3}
            />
        );
    });

    it('handles input and submits form', () => {
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'user' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalledWith('user', 'pass');
    });

    it('triggers forgot password', () => {
        const forgotPasswordLink = screen.getByText('Forgot Password?');
        fireEvent.click(forgotPasswordLink);
        expect(mockForgotPassword).toHaveBeenCalled();
    });

    it('triggers self registration', () => {
        const selfRegisterLink = screen.getByText('Self Register');
        fireEvent.click(selfRegisterLink);
        expect(mockSelfRegister).toHaveBeenCalled();
    });

    it('triggers contact support', () => {
        const contactSupportLink = screen.getByText('Contact Support');
        fireEvent.click(contactSupportLink);
        expect(mockContactSupport).toHaveBeenCalled();
    });
});
