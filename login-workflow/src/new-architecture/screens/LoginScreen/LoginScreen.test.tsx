import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginScreen } from './LoginScreen';
import { AuthContextProvider } from '../../contexts';

afterEach(cleanup);

describe('LoginScreen', () => {
    it('renders without crashing', () => {
        render(
            <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen
                    loginButtonLabel="Login"
                    forgotPasswordLabel="forgot password?"
                    selfRegisterButtonLabel="register"
                    contactSupportLabel="contact"
                />
            </AuthContextProvider>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeEnabled();
        expect(screen.getByText('forgot password?')).toBeInTheDocument();
        expect(screen.getByText('register')).toBeInTheDocument();
        expect(screen.getByText('contact')).toBeInTheDocument();
    });

    // it('renders the correct initial values', () => {
    //     render(
    //         <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
    //             <LoginScreen />
    //         </AuthContextProvider>
    //     );
    //     expect(screen.getByLabelText('Email')).toHaveValue('');
    //     expect(screen.getByLabelText('Password')).toHaveValue('');
    //     expect(screen.getByLabelText('Remember me')).not.toBeChecked();
    // });

    // it('calls the onSubmit function when the form is submitted', () => {
    //     const onSubmit = jest.fn();
    //     render(
    //         <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
    //             <LoginScreen onSubmit={onSubmit} loginButtonLabel="Login" />
    //         </AuthContextProvider>
    //     );
    //     screen.getByText('Login').click();
    //     expect(onSubmit).toHaveBeenCalled();
    // });

    it('calls onForgotPassword when the forgot password link is clicked', () => {
        const onForgotPassword = jest.fn();
        render(
            <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
                <LoginScreen onForgotPassword={onForgotPassword} forgotPasswordLabel="forgot password?" />
            </AuthContextProvider>
        );
        fireEvent.click(screen.getByText('forgot password?'));
        expect(onForgotPassword).toHaveBeenCalled();
    });

    // it('calls onSelfRegister when the sign up link is clicked', () => {
    //     const onSelfRegister = jest.fn();
    //     render(
    //         <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
    //             <LoginScreen onSelfRegister={onSelfRegister} selfRegisterButtonLabel="register" />
    //         </AuthContextProvider>
    //     );
    //     screen.getByText('register').click();
    //     expect(onSelfRegister).toHaveBeenCalled();
    // });

    // it('calls onContactSupport when the contact support link is clicked', () => {
    //     const onContactSupport = jest.fn();
    //     render(
    //         <AuthContextProvider actions={jest.fn()} language="en" navigate={jest.fn()} routeConfig={{}}>
    //             <LoginScreen onContactSupport={onContactSupport} contactSupportLabel="contact" />
    //         </AuthContextProvider>
    //     );
    //     screen.getByText('contact').click();
    //     expect(onContactSupport).toHaveBeenCalled();
    // });
});
