import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OktaLoginScreenBase } from './OktaLoginScreenBase';
import { useOktaAuth } from '@okta/okta-react';
import { Box } from '@mui/material';
import { ErrorContextProvider } from '../../contexts/ErrorContext';
import { OktaLoginScreenProps } from './types';
import { errorContextProviderProps } from '../../contexts/ErrorContext/ErrorContextProvider.test';

jest.mock('@okta/okta-react', () => ({
    useOktaAuth: jest.fn(),
}));

const mockSignInWithRedirect = jest.fn();
const mockOnContactSupport = jest.fn();

describe('OktaLoginScreenBase', () => {
    beforeEach(() => {
        (useOktaAuth as jest.Mock).mockReturnValue({
            authState: { isAuthenticated: false },
            oktaAuth: { signInWithRedirect: mockSignInWithRedirect },
        });
    });

    const renderer = (props?: OktaLoginScreenProps): RenderResult =>
        render(
            <ErrorContextProvider {...errorContextProviderProps}>
                <OktaLoginScreenBase {...props} />
            </ErrorContextProvider>
        );

    it('renders correctly', () => {
        renderer({ header: <Box data-testid="test-header">Test Header</Box> });
        expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('calls signInWithRedirect on login button click', () => {
        renderer({ loginButtonLabel: 'Login' });
        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);
        expect(mockSignInWithRedirect).toHaveBeenCalled();
    });

    it('calls onContactSupport on contact support link click', () => {
        renderer({
            showContactSupport: true,
            contactSupportLabel: 'Contact Support',
            onContactSupport: mockOnContactSupport,
        });
        const contactSupportLink = screen.getByText('Contact Support');
        fireEvent.click(contactSupportLink);
        expect(mockOnContactSupport).toHaveBeenCalled();
    });
});
