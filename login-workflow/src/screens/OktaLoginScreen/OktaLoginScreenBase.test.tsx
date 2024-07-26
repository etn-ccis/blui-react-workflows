import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OktaLoginScreenBase } from './OktaLoginScreenBase';
import { useOktaAuth } from '@okta/okta-react';
import { Box } from '@mui/material';
import { OktaLoginScreenProps } from './types';

jest.mock('@okta/okta-react', () => ({
    useOktaAuth: jest.fn(),
}));

const mockSignInWithRedirect = jest.fn();
const mockOnContactSupport = jest.fn();

describe('OktaLoginScreenBase', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        (useOktaAuth as jest.Mock).mockReturnValue({
            authState: { isAuthenticated: false },
            oktaAuth: { signInWithRedirect: mockSignInWithRedirect },
        });
    });

    const renderer = (props?: OktaLoginScreenProps): RenderResult => render(<OktaLoginScreenBase {...props} />);

    it('renders correctly', () => {
        renderer({ header: <Box data-testid="test-header">Test Header</Box> });
        expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('calls signInWithRedirect on login button click', () => {
        renderer({ loginButtonLabel: 'Login', onLogin: mockSignInWithRedirect });
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
