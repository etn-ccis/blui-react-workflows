/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { RegistrationSuccessScreen } from './RegistrationSuccessScreen';
import {
    RegistrationContextProvider,
    RegistrationContextProviderProps,
    RegistrationUIActions,
    RegistrationWorkflowContextProvider,
} from '../../contexts';
import { defaultProps as registrationContextProviderProps } from '../../contexts/RegistrationContext/RegistrationContextProvider.test';
import { defaultProps as registrationWorkflowContextProps } from '../../contexts/RegistrationWorkflowContext/RegistrationWorkflowContext.test';

afterEach(cleanup);

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

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
