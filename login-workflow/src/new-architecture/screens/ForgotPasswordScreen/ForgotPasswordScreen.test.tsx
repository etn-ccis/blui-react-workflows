import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ForgotPasswordScreenProps } from './types';
import { AuthContextProvider } from '../../contexts';
import { defaultProps as authContextProps } from '../../contexts/AuthContext/AuthContextProvider.test';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPasswordScreen } from './ForgotPasswordScreen';

afterEach(cleanup);

describe('Forgot Password Screen tests', () => {
    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProps}>
                <BrowserRouter>
                    <ForgotPasswordScreen {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    });

    it('email validation test', () => {
        const { getByLabelText } = renderer();

        const emailInput = getByLabelText('Email Address');
        expect(emailInput).toHaveValue('');
        fireEvent.change(emailInput, { target: { value: 'manojlokesh@eaton.com' } });
        expect(emailInput).tohaveValue('manojlokesh@eaton.com');
    });
});
