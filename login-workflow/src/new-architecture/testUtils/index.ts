import {
    AuthContextProviderProps,
    IndividualScreenData,
    RegistrationContextProviderProps,
    RegistrationWorkflowContextProps,
} from '../contexts';
import { i18nAuthInstance } from '../contexts/AuthContext/i18nAuthInstance';
import { i18nRegistrationInstance } from '../contexts/RegistrationContext/i18nRegistrationInstance';

export const authContextProviderProps: AuthContextProviderProps = {
    language: 'en',
    i18n: i18nAuthInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: jest.fn(),
};

export const registrationContextProviderProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
};

export const registrationWorkflowContextProps: RegistrationWorkflowContextProps = {
    currentScreen: 0,
    totalScreens: 2,
    previousScreen: () => {},
    screenData: {
        Eula: { accepted: true },
        CreateAccount: { emailAddress: 'emailAddress@emailAddress.emailAddress' },
        VerifyCode: { code: '12345' },
        CreatePassword: { password: 'password', confirmPassword: 'confirmPassword' },
        AccountDetails: { firstName: 'firstName', lastName: 'lastName' },
    },
    nextScreen: function (data: IndividualScreenData): Promise<void> {
        throw new Error('Function not implemented.');
    },
    updateScreenData: function (data: IndividualScreenData): void {
        throw new Error('Function not implemented.');
    },
};
