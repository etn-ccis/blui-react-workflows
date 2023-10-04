import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent, RenderResult } from '@testing-library/react';
import { RegistrationSuccessScreen } from './RegistrationSuccessScreen';
import { RegistrationContextProvider, RegistrationWorkflowContextProvider } from '../../contexts';
import { SuccessScreenProps } from '../SuccessScreen';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

const registrationWorkflowContextProps = {
    currentScreen: 0,
    totalScreens: 2,
    nextScreen: jest.fn(),
    previousScreen: jest.fn(),
    screenData: {
        Eula: { accepted: true },
        CreateAccount: { emailAddress: 'emailAddress@emailAddress.emailAddress' },
        VerifyCode: { code: '12345' },
        CreatePassword: { password: 'password', confirmPassword: 'confirmPassword' },
        AccountDetails: { firstName: 'firstName', lastName: 'lastName' },
        Other: { RegistrationSuccessScreen: { organizationName: 'Acme Co.' } },
    },
    updateScreenData: jest.fn(),
};

describe('RegistrationSuccessScreen', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    const renderer = (props?: SuccessScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                    <RegistrationSuccessScreen {...props} />
                </RegistrationWorkflowContextProvider>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('Account Created!')).toBeInTheDocument();
    });

    it('should display email id and organization name on success screen', () => {
        renderer();

        expect(screen.getByText('emailAddress@emailAddress.emailAddress')).toBeInTheDocument();
        expect(screen.getByText('Acme Co.')).toBeInTheDocument();
    });

    it('should call onNext, when click on Continue button', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
            },
        });

        const continueButton = screen.getByText('Finish');
        expect(continueButton).toBeInTheDocument();
        fireEvent.click(continueButton);
        expect(mockOnNext).toHaveBeenCalled();
    });
});
