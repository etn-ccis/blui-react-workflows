/**
 * @packageDocumentation
 * @module AuthContext
 */

import { i18n } from 'i18next';
import { NavigateFunction } from 'react-router-dom';
import { RouteConfig } from '../../types';
import { ErrorContextProviderProps } from '../ErrorContext/types';

export type AuthContextProviderProps = {
    actions: AuthUIActions;
    language: string;
    navigate: NavigateFunction;
    routeConfig: RouteConfig;
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
