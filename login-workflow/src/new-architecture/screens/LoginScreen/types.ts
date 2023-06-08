import { TextFieldProps } from '@mui/material';
import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type LoginErrorDialogConfiguration = {
    title?: string;
    content?: string;
    acknowledgeButtonLabel?: string;
    onAcknowledgeError?: () => void;
};

export type LoginErrorDisplayConfiguration = {
    error?: boolean | string;
    mode?: 'dialog' | 'message-box' | 'both' | 'none';
    dismissible?: boolean;
    position?: 'top' | 'bottom';
    fontColor?: string;
    backgroundColor?: string;
    dialogErrorConfig?: LoginErrorDialogConfiguration;
};

export type LoginScreenProps = WorkflowCardBaseProps & {
    // configure fields
    usernameLabel?: string;
    usernameTextFieldProps?: TextFieldProps;
    usernameValidator?: (foo: string) => boolean | string;
    initialUsernameValue?: string;
    passwordLabel?: string;
    passwordTextFieldProps?: TextFieldProps;
    passwordValidator?: (foo: string) => boolean | string;

    // configure Remember Me
    showRememberMe?: boolean;
    rememberMeLabel?: string;
    rememberMeInitialValue?: boolean;
    onRememberMeChanged?: (foo: boolean) => void;

    // configure Login
    loginButtonLabel?: string;
    onLogin?: (username?: string, password?: string, rememberMe?: boolean) => void;

    // configure Forgot Password
    showForgotPassword?: boolean;
    forgotPasswordLabel?: string;
    onForgotPassword?: () => void;

    // configure Self Registration
    showSelfRegistration?: boolean;
    selfRegisterButtonLabel?: string;
    selfRegisterInstructions?: string;
    onSelfRegister?: () => void;

    // configure Support
    showContactSupport?: boolean;
    contactSupportLabel?: string;
    onContactSupport?: () => void;

    // configure visual customizations
    errorDisplayConfig?: LoginErrorDisplayConfiguration;
    showCyberSecurityBadge?: boolean;
    projectImage?: React.ReactNode;
    header?: JSX.Element;
    footer?: JSX.Element;
};
