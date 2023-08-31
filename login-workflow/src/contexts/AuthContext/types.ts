/**
 * @packageDocumentation
 * @module AuthContext
 */

import { i18n } from 'i18next';
import { RouteConfig } from '../../types';
import { ErrorContextProviderProps } from '../ErrorContext/types';

export type AuthContextProviderProps = {
    /**
     * Defines the API calls / functions to execute when certain actions are performed in the UI (such as pressing the Login button)
     */
    actions: () => AuthUIActions;

    /**
     * Configures the language displayed on the screens
     */
    language: string;

    /**
     * Function that can be called to navigate to a new route
     * @param {string} url - path to route to
     * @returns void
     */
    navigate: (url: string) => void;

    /**
     * Object describing the URLs you are using for the relevant routes so the workflow can correctly navigate between screens
     */
    routeConfig: RouteConfig;

    /**
     * An optional i18n object that is used to translate the UI. This is only needed if you want to use custom translation keys / languages inside any of the workflow screens
     */
    i18n?: i18n;

    rememberMeDetails?: {
        /**
         * Email address to show in the email field of Login after logout.
         */
        email?: string;
        /**
         * When true, the user's email will be in the email field of Login.
         */
        rememberMe?: boolean;
    };
    errorConfig?: ErrorContextProviderProps;
};

export type AuthUIActions = {
    initiateSecurity: () => Promise<void>;
    logIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verifyResetCode: (code: string, email?: string) => Promise<void>;
    setPassword: (code: string, password: string, email?: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};
