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
 * @param passwordRequiredValidatorText text to display when the required error state is active on the password field
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
 * @param errorDisplayConfig configuration for how errors should be displayed
 * @param showCyberSecurityBadge whether or not to show the cyber security badge
 * @param projectImage image to display at the top of the screen
 * @param header header to display at the top of the screen
 * @param footer footer to display at the bottom of the screen
 *
 * @category Component
 */

type LoginScreenPropsPublic = Omit<LoginScreenProps, 'passwordValidator'> & { passwordRequiredValidatorText?: string };

export const LoginScreen: React.FC<React.PropsWithChildren<LoginScreenPropsPublic>> = (props) => {
    const { t } = useLanguageLocale();
    const auth = useAuthContext();
    const { actions, navigate, routeConfig, rememberMeDetails } = auth;
    const { triggerError, errorManagerConfig } = useErrorManager();

    useEffect(() => {
        void actions().initiateSecurity();
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
        passwordRequiredValidatorText = t('bluiCommon:MESSAGES.PASSWORD_REQUIRED_ERROR'),
        showRememberMe = true,
        rememberMeLabel = t('bluiCommon:ACTIONS.REMEMBER'),
        rememberMeInitialValue = rememberMeDetails?.rememberMe || false,
        onRememberMeChanged = (value: boolean): void => {
            props.onRememberMeChanged?.(value);
        },
        loginButtonLabel = t('bluiCommon:ACTIONS.LOG_IN'),
        showForgotPassword = true,
        forgotPasswordLabel = t('bluiCommon:LABELS.FORGOT_PASSWORD'),
        onForgotPassword = (): void => navigate(routeConfig.FORGOT_PASSWORD),
        showSelfRegistration = true,
        selfRegisterInstructions = t('bluiCommon:LABELS.NEED_ACCOUNT'),
        selfRegisterButtonLabel = t('bluiCommon:ACTIONS.CREATE_ACCOUNT'),
        onSelfRegister = (): void => navigate(routeConfig.REGISTER_SELF),
        showContactSupport = true,
        contactSupportLabel = t('bluiCommon:MESSAGES.CONTACT'),
        onContactSupport = (): void => navigate(routeConfig.SUPPORT),
        errorDisplayConfig = errorManagerConfig,
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
            passwordTextFieldProps={{ required: true, ...passwordTextFieldProps }}
            passwordValidator={(password: string): string | boolean => {
                if (password.length < 1) {
                    return passwordRequiredValidatorText;
                }
                return true;
            }}
            showRememberMe={showRememberMe}
            rememberMeLabel={rememberMeLabel}
            rememberMeInitialValue={rememberMeInitialValue}
            onRememberMeChanged={onRememberMeChanged}
            loginButtonLabel={loginButtonLabel}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onLogin={async (username: string, password: string, rememberMe: boolean): Promise<void> => {
                try {
                    await actions().logIn(username, password, rememberMe);
                    await props.onLogin?.(username, password, rememberMe);
                } catch (_error) {
                    // eslint-disable-next-line no-console
                    console.log('we caught an error');
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
