import React from 'react';
import { render, screen, fireEvent, waitFor, act, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OktaRedirectLoginScreen } from './OktaRedirectLoginScreen';
import { useOktaAuth } from '@okta/okta-react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { OktaRedirectLoginScreenProps } from './types';

jest.mock('@okta/okta-react');
jest.mock('react-i18next');
jest.mock('../../contexts');
jest.mock('../../contexts/ErrorContext/useErrorManager');

describe('OktaRedirectLoginScreen', () => {
    const mockSignInWithRedirect = jest.fn();
    const mockTriggerError = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useOktaAuth as jest.Mock).mockReturnValue({
            authState: { isAuthenticated: false },
            oktaAuth: { signInWithRedirect: mockSignInWithRedirect },
        });
        (useTranslation as jest.Mock).mockReturnValue({ t: (key: string) => key });
        (useAuthContext as jest.Mock).mockReturnValue({
            navigate: mockNavigate,
            routeConfig: { SUPPORT: '/support' },
        });
        (useErrorManager as jest.Mock).mockReturnValue({
            triggerError: mockTriggerError,
            errorManagerConfig: {},
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: OktaRedirectLoginScreenProps): RenderResult =>
        render(<OktaRedirectLoginScreen {...props} />);

    it('renders without crashing', () => {
        renderer();
        expect(screen.getByText('bluiCommon:ACTIONS.OKTA_LOG_IN')).toBeInTheDocument();
    });

    it('renders login button with correct label', () => {
        renderer();
        expect(screen.getByRole('button', { name: 'bluiCommon:ACTIONS.OKTA_LOG_IN' })).toBeInTheDocument();
    });

    it('navigates to support route when support button is clicked', () => {
        renderer();

        const supportButton = screen.getByText('bluiCommon:MESSAGES.CONTACT');

        act(() => {
            fireEvent.click(supportButton);
        });

        expect(mockNavigate).toHaveBeenCalled();
    });

    it('navigates to forgot password route when button is clicked', () => {
        renderer();

        const forgotPasswordButton = screen.getByText('bluiCommon:LABELS.FORGOT_PASSWORD');

        act(() => {
            fireEvent.click(forgotPasswordButton);
        });

        expect(mockNavigate).toHaveBeenCalled();
    });

    it('navigates to create account route when button is clicked', () => {
        renderer();

        const createAccountButton = screen.getByText('bluiCommon:ACTIONS.CREATE_ACCOUNT');

        act(() => {
            fireEvent.click(createAccountButton);
        });

        expect(mockNavigate).toHaveBeenCalled();
    });
});
