import { ErrorManagerProps } from '../../components/Error/types';
import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';
import {WidgetOptions} from '@okta/okta-signin-widget';

export type OktaLoginScreenProps = WorkflowCardBaseProps & {
    // https://github.com/okta/okta-signin-widget/blob/master/src/types/options.ts
    // oktaLoginConfigProps: object,
    //Or object with OktaSignIn type
    widgetConfigProps: WidgetOptions,

    //    // configure fields
    // /**
    //  * The label for the username field
    //  */
    // usernameLabel?: string;

    // /**
    //  * The props to pass to the username text field.
    //  * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
    //  */
    // usernameTextFieldProps?: TextFieldProps;

    // /**
    //  * The function used to validate the username
    //  * @param {string} username - validates username
    //  * @returns boolean | string
    //  */
    // usernameValidator?: (username: string) => boolean | string;

    // /**
    //  * The username used to pre-populate the field
    //  */
    // initialUsernameValue?: string;

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
}