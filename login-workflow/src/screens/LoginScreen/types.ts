import { TextFieldProps } from '@mui/material';
import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';

export type LoginScreenProps = WorkflowCardBaseProps & {
    // configure fields
    /**
     * The label for the username field
     */
    usernameLabel?: string;

    /**
     * The props to pass to the username text field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    usernameTextFieldProps?: TextFieldProps;

    /**
     * The function used to validate the username
     * @param {string} username - validates username
     * @returns boolean | string
     */
    usernameValidator?: (username: string) => boolean | string;

    /**
     * The username used to pre-populate the field
     */
    initialUsernameValue?: string;

    /**
     * The label for the password field
     */
    passwordLabel?: string;

    /**
     * The props to pass to the password text field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    passwordTextFieldProps?: TextFieldProps;

    /**
     * The function used to validate the password
     * @param {string} foo - validates username
     * @returns boolean | string
     */
    passwordValidator?: (foo: string) => boolean | string;

    // configure Remember Me
    /**
     * Whether or not to show the 'remember me' checkbox
     * @default true
     */
    showRememberMe?: boolean;

    /**
     * The label for the 'remember me' checkbox
     */
    rememberMeLabel?: string;

    /**
     * whether or not the 'remember me' checkbox should be checked by default
     * @default false
     */
    rememberMeInitialValue?: boolean;

    /**
     * The callback function that is called when the 'remember me' checkbox is changed
     * @param {boolean} onRememberMeChanged - function when remember me has changed
     * @returns void
     */
    onRememberMeChanged?: (onRememberMeChanged: boolean) => void;

    // configure Login
    /**
     * The label for the login button
     */
    loginButtonLabel?: string;

    /**
     * Callback function that is called when the login button is clicked
     * @param {string} username - user name value
     * @param {string} password - password value
     * @param {boolean} rememberMe - value passed to rememberMe or not
     * @returns Promise<void> | void
     */
    onLogin?: (username?: string, password?: string, rememberMe?: boolean) => Promise<void> | void;

    // configure Forgot Password
    /**
     * whether or not to show the 'forgot password' link
     */
    showForgotPassword?: boolean;

    /**
     * The label for the 'forgot password' link
     */
    forgotPasswordLabel?: string;

    /**
     * The callback function that is called when the 'forgot password' link is clicked
     * @returns void
     */
    onForgotPassword?: () => void;

    // configure Self Registration
    /**
     * whether or not to show the 'self registration' link
     */
    showSelfRegistration?: boolean;

    /**
     * The label for the 'self registration' link
     */
    selfRegisterButtonLabel?: string;

    /**
     * The instructions for the 'self registration' link
     */
    selfRegisterInstructions?: string;

    /**
     * The callback function that is called when the 'self registration' link is clicked
     * @returns void
     */
    onSelfRegister?: () => void;

    // configure Support
    /**
     * whether or not to show the 'contact support' link
     */
    showContactSupport?: boolean;

    /**
     * The label for the 'contact support' link
     */
    contactSupportLabel?: string;

    /**
     * The callback function that is called when the 'contact support' link is clicked
     * @returns void
     */
    onContactSupport?: () => void;

    // configure visual customizations
    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;

    /**
     * whether or not to show the cyber security badge
     */
    showCyberSecurityBadge?: boolean;

    /**
     * The image to display at the top of the screen
     */
    projectImage?: React.ReactNode;

    /**
     * The header to display at the top of the screen
     */
    header?: JSX.Element;

    /**
     * The footer to display at the bottom of the screen
     */
    footer?: JSX.Element;
};
