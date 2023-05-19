import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';

// export type WorkflowCardBaseProps = BoxProps & {
//     loading?: boolean;
//     backgroundImage?: string; // card background
//     error?: boolean | string; // each screen should have an error state
//     CardProps?: CardProps;
//     LoaderComponent?: ReactNode;
//     slots?: { card?: React.ElementType; loader?: React.ElementType };
// };

export type LoginErrorDisplayConfiguration = {
    error?: boolean | string;
    mode?: 'dialog' | 'message-box' | 'both' | 'none';
    dismissible?: boolean;
    position?: 'top' | 'bottom';
    fontColor?: string;
    backgroundColor?: string;
};

// WorkflowCardBaseProps = loading, background, error
export type LoginScreenProps = WorkflowCardBaseProps & {
    // configure fields
    usernameLabel?: string;
    usernameValidator?: (foo: string) => boolean | string;
    initialUsernameValue?: string;
    passwordLabel?: string;
    passwordValidator?: (foo: string) => boolean | string;

    // configure Remember Me
    showRememberMe?: boolean;
    rememberMeLabel?: string;
    rememberMeInitialValue?: boolean;
    onRememberMeChanged?: (foo: boolean) => void;

    // configure Login
    loginButtonLabel?: string;
    onLogin?: (username: string, password: string) => void; // boolean? error code/string?

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
