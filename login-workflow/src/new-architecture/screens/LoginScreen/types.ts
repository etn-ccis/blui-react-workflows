import { TextFieldProps } from '@mui/material';
import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

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
    onLogin?: (username?: string, password?: string, rememberMe?: boolean) => Promise<void> | void;

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
    errorDisplayConfig?: ErrorManagerProps;
    showCyberSecurityBadge?: boolean;
    projectImage?: React.ReactNode;
    header?: JSX.Element;
    footer?: JSX.Element;
};
