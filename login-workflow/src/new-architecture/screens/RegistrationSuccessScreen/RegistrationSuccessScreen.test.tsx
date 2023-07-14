/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { RegistrationSuccessScreen } from './RegistrationSuccessScreen';
import {
    i18nRegistrationInstance,
    RegistrationContextProvider,
    RegistrationContextProviderProps,
    RegistrationUIActions,
    RegistrationWorkflowContextProvider,
} from '../../contexts';

afterEach(cleanup);

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const registrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: jest.fn(),
    routeConfig: {},
};

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

const registrationContextDefaultProps: RegistrationContextProviderProps = {
    ...registrationContextProviderProps,
    actions: (): RegistrationUIActions => ({
        completeRegistration: async (
            userData,
            validationCode,
            validationEmail
        ): Promise<{ email: string; organizationName: string }> => {
            await sleep(1000);

            return { email: 'email@email.email', organizationName: 'organizationName' };
        },
    }),
};

describe('RegistrationSuccessScreen', () => {
    it('renders without crashing', () => {
        render(
            <RegistrationContextProvider {...registrationContextDefaultProps}>
                <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                    <RegistrationSuccessScreen />
                </RegistrationWorkflowContextProvider>
            </RegistrationContextProvider>
        );
        expect(screen.getByText('Account Created!')).toBeInTheDocument();
    });
});
