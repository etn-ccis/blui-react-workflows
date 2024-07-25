import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error/types';
import { OktaAuthOptions } from '@okta/okta-auth-js';

export type OktaLoginScreenProps = WorkflowCardBaseProps & {
    /**
     * Options for configuring the Okta Auth SDK.
     */
    oktaAuthOptions?: OktaAuthOptions;

    /**
     * The label for the username field
     */
    loginButtonLabel?: string;

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
