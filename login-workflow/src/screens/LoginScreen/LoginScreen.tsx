import React, { useEffect, useState } from 'react';
import { LoginScreenProps } from './types';
import { LoginScreenBase } from './LoginScreenBase';
import { useAuthContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';
import { useTranslation } from 'react-i18next';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 * @param {LoginScreenProps} props - props of LoginScreen
 *
 * @category Component
 */

export const LoginScreen: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const { t } = useTranslation();
    const auth = useAuthContext();
    const { actions, navigate, routeConfig, rememberMeDetails } = auth;
    const { triggerError, errorManagerConfig } = useErrorManager();
    const [isLoading, setIsLoading] = useState(false);
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    useEffect(() => {
        void actions.initiateSecurity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        usernameLabel = t('bluiCommon:LABELS.EMAIL'),
        usernameTextFieldProps,
        usernameValidator = (username: string): string | boolean => {
            if (!EMAIL_REGEX.test(username)) {
                return t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR');
            }
            return true;
        },
        initialUsernameValue = rememberMeDetails?.email || '',
        passwordLabel = t('bluiCommon:LABELS.PASSWORD'),
        passwordTextFieldProps,
        passwordValidator = (password: string): string | boolean => {
            if (password.length < 1) {
                return t('bluiCommon:MESSAGES.PASSWORD_REQUIRED_ERROR');
            }
            return true;
        },
        showRememberMe = true,
        rememberMeLabel = t('bluiCommon:ACTIONS.REMEMBER'),
        rememberMeInitialValue = rememberMeDetails?.rememberMe || false,
        onRememberMeChanged = (value: boolean): void => {
            props.onRememberMeChanged?.(value);
        },
        loginButtonLabel = t('bluiCommon:ACTIONS.LOG_IN'),
        showForgotPassword = true,
        forgotPasswordLabel = t('bluiCommon:LABELS.FORGOT_PASSWORD'),
        onForgotPassword = (): void => navigate(routeConfig.FORGOT_PASSWORD as string),
        showSelfRegistration = true,
        selfRegisterInstructions = t('bluiCommon:LABELS.NEED_ACCOUNT'),
        selfRegisterButtonLabel = t('bluiCommon:ACTIONS.CREATE_ACCOUNT'),
        onSelfRegister = (): void => navigate(routeConfig.REGISTER_SELF as string),
        showContactSupport = true,
        contactSupportLabel = t('bluiCommon:MESSAGES.CONTACT'),
        onContactSupport = (): void => navigate(routeConfig.SUPPORT as string),
        showCyberSecurityBadge = true,
        projectImage,
        header,
        footer,
    } = props;

    return (
        <LoginScreenBase
            loading={isLoading}
            usernameLabel={usernameLabel}
            usernameTextFieldProps={usernameTextFieldProps}
            usernameValidator={usernameValidator}
            initialUsernameValue={initialUsernameValue}
            passwordLabel={passwordLabel}
            passwordTextFieldProps={passwordTextFieldProps}
            passwordValidator={passwordValidator}
            showRememberMe={showRememberMe}
            rememberMeLabel={rememberMeLabel}
            rememberMeInitialValue={rememberMeInitialValue}
            onRememberMeChanged={onRememberMeChanged}
            loginButtonLabel={loginButtonLabel}
            onLogin={
                (async (username: string, password: string, rememberMe: boolean): Promise<void> => {
                    try {
                        setIsLoading(true);
                        await actions.logIn(username, password, rememberMe);
                        await props.onLogin?.(username, password, rememberMe);
                    } catch (_error) {
                        triggerError(_error as Error);
                    } finally {
                        setIsLoading(false);
                    }
                }) as any
            }
            showForgotPassword={showForgotPassword}
            forgotPasswordLabel={forgotPasswordLabel}
            onForgotPassword={onForgotPassword}
            showSelfRegistration={showSelfRegistration}
            selfRegisterButtonLabel={selfRegisterButtonLabel}
            selfRegisterInstructions={selfRegisterInstructions}
            onSelfRegister={onSelfRegister}
            showContactSupport={showContactSupport}
            contactSupportLabel={contactSupportLabel}
            onContactSupport={onContactSupport}
            errorDisplayConfig={errorDisplayConfig}
            showCyberSecurityBadge={showCyberSecurityBadge}
            projectImage={projectImage}
            header={header}
            footer={footer}
        />
    );
};
