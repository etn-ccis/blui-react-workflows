import {
    AuthContextProviderProps,
    RegistrationContextProviderProps,
    RegistrationWorkflowContextProps,
} from '../contexts';
import i18nAuthInstance from '../contexts/AuthContext/i18nAuthInstance';
import i18nRegistrationInstance from '../contexts/RegistrationContext/i18nRegistrationInstance';

export const authContextProviderProps: AuthContextProviderProps = {
    language: 'en',
    i18n: i18nAuthInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: {
        initiateSecurity: jest.fn(),
        logIn: jest.fn(),
        forgotPassword: jest.fn(),
        verifyResetCode: jest.fn(),
        setPassword: jest.fn(),
        changePassword: jest.fn(),
    },
};

export const registrationContextProviderProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
    actions: {
        loadEula: jest.fn(),
        acceptEula: jest.fn(),
        requestRegistrationCode: jest.fn(),
        validateUserRegistrationRequest: jest.fn(),
        createPassword: jest.fn(),
        setAccountDetails: jest.fn(),
        completeRegistration: jest.fn(),
    },
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
    nextScreen: function (): Promise<void> {
        throw new Error('Function not implemented.');
    },
    updateScreenData: function (): void {
        throw new Error('Function not implemented.');
    },
};
