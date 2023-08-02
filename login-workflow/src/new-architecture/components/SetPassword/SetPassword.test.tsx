import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { SetPassword } from './SetPassword';
import { AuthUIContextProvider } from '../../../auth-shared';
import { AuthContextProvider } from '../../contexts';
import { PasswordRequirement, SetPasswordProps } from './types';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

const passwordRequirements: PasswordRequirement[] = [
    {
        description: 'Check 1',
        regex: /^.{3,5}$/,
    },
    {
        description: 'Check 2',
        regex: /[a-z]+/,
    },
];

const setPasswordProps: SetPasswordProps = {
    newPasswordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    initialNewPasswordValue: '',
    initialConfirmPasswordValue: '',
    passwordNotMatchError: 'Passwords do not match',
    onPasswordChange: jest.fn(),
    passwordRequirements: passwordRequirements,
};

const isValidPassword = (passwordInput: string): boolean => {
    for (let i = 0; i < passwordRequirements.length; i++) {
        if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
    }
    return true;
};

describe('SetPassword', () => {
    const renderer = (props = setPasswordProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <AuthUIContextProvider authActions={jest.fn()} registrationActions={jest.fn()}>
                    <SetPassword {...props} />
                </AuthUIContextProvider>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirm')).toBeInTheDocument();
    });

    it('should display default props', () => {
        renderer();

        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.queryByLabelText('Password')).toBeEmptyDOMElement();
        expect(screen.queryByLabelText('Confirm Password')).toBeEmptyDOMElement();
    });

    it('should display the passed props', () => {
        const props = {
            ...setPasswordProps,
            newPasswordLabel: 'New Password',
            confirmPasswordLabel: 'New Confirm Password',
        };
        renderer(props);

        expect(screen.getByLabelText('New Password')).toBeInTheDocument();
        expect(screen.getByLabelText('New Confirm Password')).toBeInTheDocument();
    });

    it('should display the updated password requirements, when passed through passwordRequirements', () => {
        const props = { ...setPasswordProps, passwordRequirements };
        renderer(props);

        expect(screen.queryByText('8-16 Characters')).toBeNull();
        expect(screen.getByText('Check 1')).toBeInTheDocument();
        expect(screen.getByText('Check 2')).toBeInTheDocument();
    });

    it('should check the password requirements', () => {
        const props = { ...setPasswordProps, passwordRequirements };
        renderer(props);

        expect(isValidPassword('123')).toBeFalsy();
        expect(isValidPassword('A123')).toBeFalsy();
        expect(isValidPassword('a123')).toBeTruthy();
    });

    it('should display the field error, when passwords do not match', () => {
        const { getByLabelText, rerender } = renderer();

        const passwordField = getByLabelText('Password');
        const confirmPasswordField = getByLabelText('Confirm Password');

        fireEvent.focus(passwordField);
        fireEvent.change(passwordField, { target: { value: '1' } });
        fireEvent.blur(passwordField);

        fireEvent.focus(confirmPasswordField);
        fireEvent.change(confirmPasswordField, { target: { value: '2' } });
        fireEvent.blur(confirmPasswordField);

        rerender(
            <AuthContextProvider {...authContextProviderProps}>
                <AuthUIContextProvider authActions={jest.fn()} registrationActions={jest.fn()}>
                    <SetPassword {...setPasswordProps} />
                </AuthUIContextProvider>
            </AuthContextProvider>
        );

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('should display the green check icon, when passwords match', () => {
        const props = { ...setPasswordProps };
        props.passwordRequirements = [];
        const { getByLabelText, getByTestId, queryByTestId, rerender } = renderer();

        const passwordField = getByLabelText('Password');
        const confirmPasswordField = getByLabelText('Confirm Password');

        expect(queryByTestId('check')).toBeNull();

        fireEvent.focus(passwordField);
        fireEvent.change(passwordField, { target: { value: '2' } });
        fireEvent.blur(passwordField);

        fireEvent.focus(confirmPasswordField);
        fireEvent.change(confirmPasswordField, { target: { value: '2' } });
        fireEvent.blur(confirmPasswordField);

        rerender(
            <AuthContextProvider {...authContextProviderProps}>
                <AuthUIContextProvider authActions={jest.fn()} registrationActions={jest.fn()}>
                    <SetPassword {...props} />
                </AuthUIContextProvider>
            </AuthContextProvider>
        );

        expect(getByTestId('check')).toBeInTheDocument();
    });
});
