import {
    AccountDetails,
    AuthContextProviderProps,
    RegistrationContextProviderProps,
    RegistrationWorkflowContextProps,
} from '../contexts';
import i18nAuthInstance from '../contexts/AuthContext/i18nAuthInstance';
import i18nRegistrationInstance from '../contexts/RegistrationContext/i18nRegistrationInstance';

export const authContextProviderProps: AuthContextProviderProps = {
    language: 'en',
    i18n: i18nAuthInstance,
    navigate: (): void => { },
    routeConfig: {},
    actions: {
        initiateSecurity: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        logIn: function (email: string, password: string, rememberMe: boolean): Promise<void> {
            throw new Error('Function not implemented.');
        },
        forgotPassword: function (email: string): Promise<void> {
            throw new Error('Function not implemented.');
        },
        verifyResetCode: function (code: string, email?: string): Promise<void> {
            throw new Error('Function not implemented.');
        },
        setPassword: function (code: string, password: string, email?: string): Promise<void> {
            throw new Error('Function not implemented.');
        },
        changePassword: function (oldPassword: string, newPassword: string): Promise<void> {
            throw new Error('Function not implemented.');
        }
    }
};

export const registrationContextProviderProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => { },
    routeConfig: {},
    actions: {
        loadEula: function (language: string): Promise<string> {
            throw new Error('Function not implemented.');
        },
        acceptEula: function (): Promise<void> {
            throw new Error('Function not implemented.');
        },
        requestRegistrationCode: function (email: string): Promise<string> {
            throw new Error('Function not implemented.');
        },
        validateUserRegistrationRequest: function (validationCode: string, validationEmail?: string): Promise<boolean> {
            throw new Error('Function not implemented.');
        },
        createPassword: function (password: string): Promise<boolean> {
            throw new Error('Function not implemented.');
        },
        setAccountDetails: function (details: AccountDetails): Promise<boolean> {
            throw new Error('Function not implemented.');
        },
        completeRegistration: function (
            userData: any,
            validationCode: number | string,
            validationEmail: string
        ): Promise<{ email: string; organizationName: string }> {
            throw new Error('Function not implemented.');
        }
    }
};

export const registrationWorkflowContextProps: RegistrationWorkflowContextProps = {
    currentScreen: 0,
    totalScreens: 2,
    previousScreen: () => { },
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
