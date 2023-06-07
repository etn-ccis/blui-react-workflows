import React /*, { useCallback, useRef, useState } */ from 'react';
import { LoginScreenProps } from './types';
// import { WorkflowCard } from '../../components/WorkflowCard';
// import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import cyberSecurityBadge from '../../../assets/images/cybersecurity_certified.png';
// import { PasswordTextField } from '../../components';
// import Button from '@mui/material/Button';
// import { SxProps, Theme, useTheme } from '@mui/material/styles';
// import Checkbox from '@mui/material/Checkbox';
// import Close from '@mui/icons-material/Close';
// import * as Colors from '@brightlayer-ui/colors';
// import { HELPER_TEXT_HEIGHT } from '../../utils/constants';
import { LoginScreenClassKey, getLoginScreenUtilityClass } from './utilityClasses';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { LoginScreenBase } from './LoginScreenBase';
import { useLanguageLocale } from '../../hooks';
import CybersecurityBadge from './cybersecurity_certified.png';

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

const useUtilityClasses = (ownerState: LoginScreenProps): Record<LoginScreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        projectImageWrapper: ['projectImageWrapper'],
        inputFieldsWrapper: ['inputFieldsWrapper'],
        usernameTextField: ['usernameTextField'],
        passwordTextField: ['passwordTextField'],
        rememberMeLoginRowWrapper: ['rememberMeLoginRowWrapper'],
        rememberMeWrapper: ['rememberMeWrapper'],
        rememberMeCheckbox: ['rememberMeCheckbox'],
        rememberMeLabel: ['rememberMeLabel'],
        loginButtonWrapper: ['loginButtonWrapper'],
        loginButton: ['loginButton'],
        forgotPasswordWrapper: ['forgotPasswordWrapper'],
        forgotPasswordLabel: ['forgotPasswordLabel'],
        selfRegisterWrapper: ['selfRegisterWrapper'],
        selfRegisterInstructionLabel: ['selfRegisterInstructionLabel'],
        selfRegisterLabel: ['selfRegisterLabel'],
        contactSupportWrapper: ['contactSupportWrapper'],
        contactSupportLabel: ['contactSupportLabel'],
        cyberSecurityBadgeWrapper: ['cyberSecurityBadgeWrapper'],
        cyberSecurityBadge: ['cyberSecurityBadge'],
    };

    return composeClasses(slots, getLoginScreenUtilityClass, classes);
};

export const LoginScreen: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const { t } = useLanguageLocale();
    const {
        usernameLabel = t('bluiAuth:LABELS.EMAIL'),
        usernameTextFieldProps,
        usernameValidator,
        initialUsernameValue,
        passwordLabel = t('bluiAuth:LABELS.PASSWORD'),
        passwordTextFieldProps,
        passwordValidator,
        showRememberMe,
        rememberMeLabel = t('bluiAuth:ACTIONS.REMEMBER'),
        rememberMeInitialValue,
        onRememberMeChanged,
        loginButtonLabel = t('bluiAuth:ACTIONS.LOG_IN'),
        onLogin,
        showForgotPassword,
        forgotPasswordLabel = t('bluiAuth:LABELS.FORGOT_PASSWORD'),
        onForgotPassword,
        showSelfRegistration,
        selfRegisterButtonLabel = t('bluiAuth:LABELS.NEED_ACCOUNT'),
        selfRegisterInstructions = t('bluiAuth:LABELS.CREATE_ACCOUNT'),
        onSelfRegister,
        showContactSupport,
        contactSupportLabel = t('bluiAuth:MESSAGES.CONTACT'),
        onContactSupport,
        errorDisplayConfig,
        showCyberSecurityBadge,
        projectImage = CybersecurityBadge,
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
