import React, { useEffect } from 'react';
import { LoginScreenProps } from './types';
import { LoginScreenBase } from './LoginScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 * @param usernameLabel label for the username field
 * @param usernameTextFieldProps props to pass to the username text field
 * @param usernameValidator function used to validate the username
 * @param initialUsernameValue username used to pre-populate the field
 * @param passwordLabel label for the password field
 * @param passwordTextFieldProps props to pass to the password text field
 * @param passwordValidator function used to validate the password
 * @param showRememberMe whether or not to show the 'remember me' checkbox
 * @param rememberMeLabel label for the 'remember me' checkbox
 * @param rememberMeInitialValue whether or not the 'remember me' checkbox should be checked by default
 * @param onRememberMeChanged callback function that is called when the 'remember me' checkbox is changed
 * @param loginButtonLabel label for the login button
 * @param onLogin callback function that is called when the login button is clicked
 * @param showForgotPassword whether or not to show the 'forgot password' link
 * @param forgotPasswordLabel label for the 'forgot password' link
 * @param onForgotPassword callback function that is called when the 'forgot password' link is clicked
 * @param showSelfRegistration whether or not to show the 'self registration' link
 * @param selfRegisterButtonLabel label for the 'self registration' link
 * @param selfRegisterInstructions instructions for the 'self registration' link
 * @param onSelfRegister callback function that is called when the 'self registration' link is clicked
 * @param showContactSupport whether or not to show the 'contact support' link
 * @param contactSupportLabel label for the 'contact support' link
 * @param onContactSupport callback function that is called when the 'contact support' link is clicked
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param showCyberSecurityBadge whether or not to show the cyber security badge
 * @param projectImage image to display at the top of the screen
 * @param header header to display at the top of the screen
 * @param footer footer to display at the bottom of the screen
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 *
 * @category Component
 */

export const LoginScreen: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const { t } = useLanguageLocale();
    const auth = useAuthContext();
    const { actions, navigate, routeConfig, rememberMeDetails } = auth;
    const { triggerError, errorManagerConfig } = useErrorManager();
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
            onLogin={async (username: string, password: string, rememberMe: boolean): Promise<void> => {
                try {
                    await actions.logIn(username, password, rememberMe);
                    await props.onLogin?.(username, password, rememberMe);
                } catch (_error) {
                    triggerError(_error as Error);
                }
            }}
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
