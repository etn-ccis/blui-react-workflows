import { i18n } from 'i18next';
import { ErrorContextProviderProps } from '../ErrorContext';

// @TODO: this will need migrated to AuthContext types when that is ready
export type AccountDetails = {
    firstName: string;
    lastName: string;
    extra?: { [key: string]: boolean | string | number };
};

// @TODO: this will need migrated to routing types when the routing
export type RouteConfig = {
    LOGIN?: string;
    FORGOT_PASSWORD?: string;
    RESET_PASSWORD?: string;
    REGISTER_INVITE?: string;
    REGISTER_SELF?: string;
    SUPPORT?: string;
};

// this should be updated to add new actions for greater control
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
