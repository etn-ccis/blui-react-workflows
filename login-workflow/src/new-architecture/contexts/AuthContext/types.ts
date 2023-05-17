/**
 * @packageDocumentation
 * @module AuthContext
 */

import { i18n } from 'i18next';
import { RouteConfig } from '../../../routing/AuthNavigationContainer';

export type AuthContextProps = {
    actions: () => AuthUIActions;
    language: string;
    navigate: (url: string) => void;
    routeConfig: RouteConfig;
    i18n?: i18n;
};

export type AuthUIActions = {
    initiateSecurity: () => Promise<void>;
    logIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verifyResetCode: (code: string, email?: string) => Promise<void>;
    setPassword: (code: string, password: string, email?: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};
