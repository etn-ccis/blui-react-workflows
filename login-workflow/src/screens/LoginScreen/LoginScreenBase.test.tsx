import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginScreenBase } from './LoginScreenBase';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

afterEach(cleanup);

const mockLogin = jest.fn();
const mockForgotPassword = jest.fn();
const mockSelfRegister = jest.fn();
const mockContactSupport = jest.fn();
const mockRememberMeChanged = jest.fn();

describe('LoginScreenBase', () => {
    beforeEach(() => {
        render(
            <LoginScreenBase
                usernameLabel="Email Address"
                usernameValidator={(username: string): string | boolean => {
                    if (!EMAIL_REGEX.test(username)) {
                        return 'Enter a valid email address';
                    }
                    return true;
                }}
                initialUsernameValue=""
                passwordLabel="Password"
                passwordValidator={(password: string): string | boolean => {
                    if (password.length < 2) {
                        return 'Password must be at least 2 characters';
                    }
                    return true;
                }}
                rememberMeLabel="Remember Me"
                rememberMeInitialValue={true}
                onRememberMeChanged={(value: boolean): void => {
                    mockRememberMeChanged(value);
                }}
                loginButtonLabel="Log In"
                onLogin={(username: string, password: string): void => {
                    mockLogin(username, password);
                }}
                forgotPasswordLabel="Forgot your password?"
                onForgotPassword={(): void => {
                    mockForgotPassword();
                }}
                selfRegisterButtonLabel="Register now!"
                selfRegisterInstructions="Need an account"
                onSelfRegister={(): void => {
                    mockSelfRegister();
                }}
                contactSupportLabel="Contact an Eaton Support Representative"
                onContactSupport={(): void => {
                    mockContactSupport();
                }}
            />
        );
    });

    test('renders without crashing', () => {
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Email Address')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
    });

    test('disables login button when username and password are invalid', () => {
        const usernameInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(usernameInput, { target: { value: 'us' } });
        fireEvent.change(passwordInput, { target: { value: 'p' } });
        fireEvent.blur(passwordInput);

        expect(loginButton).toBeDisabled();
    });

    test('disables login button when username and password are invalid', () => {
        const usernameInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(usernameInput, { target: { value: 'us' } });
        fireEvent.change(passwordInput, { target: { value: 'p' } });

        expect(loginButton).toBeDisabled();
    });

    test('enables login button when username and password are valid', () => {
        const usernameInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(usernameInput, { target: { value: 'email@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });

        expect(loginButton).toBeEnabled();
    });

    test('handles input and submits form', () => {
        const usernameInput = screen.getByLabelText('Email Address');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(usernameInput, { target: { value: 'email@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalledWith('email@email.com', 'pass');
    });
});
