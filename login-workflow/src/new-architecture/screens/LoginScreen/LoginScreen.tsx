import React from 'react';
import { LoginScreenProps } from './types';
import { LoginScreenBase } from './LoginScreenBase';
import { useLanguageLocale } from '../../hooks';

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
 * @param errorDisplayConfig configuration for how errors should be displayed
 * @param showCyberSecurityBadge whether or not to show the cyber security badge
 * @param projectImage image to display at the top of the screen
 * @param header header to display at the top of the screen
 * @param footer footer to display at the bottom of the screen
 *
 * @category Component
 */

export const LoginScreen: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const { t } = useLanguageLocale();
    const {
        usernameLabel = t('bluiAuth:LABELS.EMAIL'),
        usernameTextFieldProps,
        usernameValidator = (username: string): string | boolean => {
            if (!EMAIL_REGEX.test(username)) {
                return 'Enter a valid email address';
            }
            return true;
        },
        initialUsernameValue,
        passwordLabel = t('bluiAuth:LABELS.PASSWORD'),
        passwordTextFieldProps,
        passwordValidator,
        showRememberMe = true,
        rememberMeLabel = t('bluiAuth:ACTIONS.REMEMBER'),
        rememberMeInitialValue = false,
        onRememberMeChanged,
        loginButtonLabel = t('bluiAuth:ACTIONS.LOG_IN'),
        onLogin,
        showForgotPassword = true,
        forgotPasswordLabel = t('bluiAuth:LABELS.FORGOT_PASSWORD'),
        onForgotPassword,
        showSelfRegistration = true,
        selfRegisterInstructions = t('bluiAuth:LABELS.NEED_ACCOUNT'),
        selfRegisterButtonLabel = t('bluiAuth:ACTIONS.CREATE_ACCOUNT'),
        onSelfRegister,
        showContactSupport = true,
        contactSupportLabel = t('bluiAuth:MESSAGES.CONTACT'),
        onContactSupport,
        errorDisplayConfig,
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
            onLogin={onLogin}
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
