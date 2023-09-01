import { i18n } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { ErrorContextProviderProps } from '../ErrorContext';
import { RouteConfig } from '../../types';

export type AccountDetails = {
    firstName: string;
    lastName: string;
    extra?: { [key: string]: boolean | string | number };
};

// this should be updated to add new actions for greater control
export type RegistrationUIActions = {
    loadEula?: (language: string) => Promise<string>;
    acceptEula?: () => Promise<void>;
    requestRegistrationCode?: (email: string) => Promise<string>;
    validateUserRegistrationRequest?: (validationCode: string, validationEmail?: string) => Promise<boolean>;
    createPassword?: (password: string) => Promise<boolean>;
    setAccountDetails?: (details: AccountDetails) => Promise<boolean>;
    completeRegistration?: (userData: object) => Promise<{ email: string; organizationName: string }>;
};

export type RegistrationContextProviderProps = {
    actions?: () => RegistrationUIActions;
    language: string;
    navigate: NavigateFunction;
    routeConfig: RouteConfig;
    i18n?: i18n; // add languages / override strings in bulk
    errorConfig?: ErrorContextProviderProps;
};
