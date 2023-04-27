/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import React from 'react';
import { AuthUIContextProviderProps } from './types';
import { AuthUIContext } from './context';

export const AuthUIContextProvider: React.FC<React.PropsWithChildren<AuthUIContextProviderProps>> = (props) => {
    // Extract the needed properties out
    // Context value will not change unless a sub function is changed
    // NOTE: When adding new props to AuthUIContextProviderProps be sure
    // to also add them here so the parameters are copied.
    const memoizedProps = React.useMemo(() => {
        const propsForContext: AuthUIContextProviderProps = {
            authActions: props.authActions,
            registrationActions: props.registrationActions,
            showSelfRegistration: props.showSelfRegistration,
            enableInviteRegistration: props.enableInviteRegistration,
            showContactSupport: props.showContactSupport,
            enableResetPassword: props.enableResetPassword,
            enableCreatePassword: props.enableCreatePassword,
            showRememberMe: props.showRememberMe,
            showCybersecurityBadge: props.showCybersecurityBadge,
            allowDebugMode: props.allowDebugMode,
            projectImage: props.projectImage,
            background: props.background,
            contactEmail: props.contactEmail,
            contactPhone: props.contactPhone,
            contactPhoneLink: props.contactPhoneLink,
            htmlEula: props.htmlEula,
            loginActions: props.loginActions,
            loginFooter: props.loginFooter,
            loginHeader: props.loginHeader,
            loginType: props.loginType,
            loginErrorDisplayConfig: props.loginErrorDisplayConfig,
            passwordRequirements: props.passwordRequirements,
            customAccountDetails: props.customAccountDetails,
            registrationSuccessScreen: props.registrationSuccessScreen,
            accountAlreadyExistsScreen: props.accountAlreadyExistsScreen,
            registrationConfig: props.registrationConfig,
            disablePagerAnimation: props.disablePagerAnimation,
        };

        return propsForContext;
    }, [
        props.accountAlreadyExistsScreen,
        props.allowDebugMode,
        props.authActions,
        props.background,
        props.contactEmail,
        props.contactPhone,
        props.contactPhoneLink,
        props.customAccountDetails,
        props.disablePagerAnimation,
        props.registrationSuccessScreen,
        props.enableInviteRegistration,
        props.enableResetPassword,
        props.enableCreatePassword,
        props.htmlEula,
        props.loginActions,
        props.loginFooter,
        props.loginHeader,
        props.loginType,
        props.loginErrorDisplayConfig,
        props.passwordRequirements,
        props.projectImage,
        props.registrationActions,
        props.showContactSupport,
        props.showRememberMe,
        props.showCybersecurityBadge,
        props.showSelfRegistration,
        props.registrationConfig,
    ]);

    return <AuthUIContext.Provider value={memoizedProps}>{props.children}</AuthUIContext.Provider>;
};
