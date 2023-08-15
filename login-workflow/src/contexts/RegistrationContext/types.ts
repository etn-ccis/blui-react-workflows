import { i18n } from 'i18next';
import { ErrorContextProviderProps } from '../ErrorContext';


export type AccountDetails = {
    firstName: string;
    lastName: string;
    extra?: { [key: string]: boolean | string | number };
};

export type RouteConfig = {
    LOGIN?: string;
    FORGOT_PASSWORD?: string;
    RESET_PASSWORD?: string;
    REGISTER_INVITE?: string;
    REGISTER_SELF?: string;
    SUPPORT?: string;
};

export type RegistrationUIActions = {
    loadEula?: (language: string) => Promise<string>;
    acceptEula?: () => Promise<boolean>;
    requestRegistrationCode?: (email: string) => Promise<string>;
    validateUserRegistrationRequest?: (validationCode: string, validationEmail?: string) => Promise<boolean>;
    createPassword?: (password: string) => Promise<boolean>;
    setAccountDetails?: (details: AccountDetails) => Promise<boolean>;
    completeRegistration?: (
        userData: any,
        validationCode: number | string,
        validationEmail: string
    ) => Promise<{ email: string; organizationName: string }>;
};

export type RegistrationContextProviderProps = {
    actions?: () => RegistrationUIActions;
    language: string;
    navigate: (url: string) => void;
    routeConfig: RouteConfig;
    i18n?: i18n; // add languages / override strings in bulk
    errorConfig?: ErrorContextProviderProps;
};
