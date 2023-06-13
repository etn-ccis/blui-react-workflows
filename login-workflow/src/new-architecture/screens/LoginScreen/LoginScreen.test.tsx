import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginScreen } from './LoginScreen';
import { AuthContextProvider } from '../../contexts';
import { ProjectAuthUIActions } from './AuthUIActions';

afterEach(cleanup);

describe('LoginScreen', () => {
    it('renders without crashing', () => {
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen
                    loginButtonLabel="Login"
                    forgotPasswordLabel="forgot password?"
                    selfRegisterButtonLabel="register"
                    contactSupportLabel="contact"
                />
            </AuthContextProvider>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeDisabled();
        expect(screen.getByText('forgot password?')).toBeInTheDocument();
        expect(screen.getByText('register')).toBeInTheDocument();
        expect(screen.getByText('contact')).toBeInTheDocument();
    });

    it('renders the correct initial values', () => {
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen usernameLabel="Email" passwordLabel="Password" />
            </AuthContextProvider>
        );
        expect(screen.getByLabelText('Email')).toHaveValue('');
        expect(screen.getByLabelText('Password')).toHaveValue('');
    });

    it('calls the onLogin function when the form is submitted', () => {
        const onLogin = jest.fn();
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen onLogin={onLogin} loginButtonLabel="Login" initialUsernameValue="test@email.com" />
            </AuthContextProvider>
        );
        screen.getByText('Login').click();
        expect(onLogin).toHaveBeenCalled();
    });

    it('calls onForgotPassword when the forgot password link is clicked', () => {
        const onForgotPassword = jest.fn();
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen onForgotPassword={onForgotPassword} forgotPasswordLabel="forgot password?" />
            </AuthContextProvider>
        );
        screen.getByText('forgot password?').click();
        expect(onForgotPassword).toHaveBeenCalled();
    });

    it('calls onSelfRegister when the sign up link is clicked', () => {
        const onSelfRegister = jest.fn();
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen onSelfRegister={onSelfRegister} selfRegisterButtonLabel="register" />
            </AuthContextProvider>
        );
        screen.getByText('register').click();
        expect(onSelfRegister).toHaveBeenCalled();
    });

    it('calls onContactSupport when the contact support link is clicked', () => {
        const onContactSupport = jest.fn();
        render(
            <AuthContextProvider actions={ProjectAuthUIActions} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen onContactSupport={onContactSupport} contactSupportLabel="contact" />
            </AuthContextProvider>
        );
        screen.getByText('contact').click();
        expect(onContactSupport).toHaveBeenCalled();
    });
});
