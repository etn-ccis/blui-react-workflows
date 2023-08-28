import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type ContactScreenProps = WorkflowCardProps & {
    /**
     * @param title The title for the screen
     * @returns string
     */
    title?: string;

    /**
     * @param icon The icon to display in the header
     * @returns JSX.Element
     */
    icon?: JSX.Element;

    /**
     * @param emailSupportTitle The title for the email support section
     * @returns string
     */
    emailSupportTitle?: string;

    /**
     * @param emailSupportContent The content for the email support section
     * @returns string | JSX.Element
     */
    emailSupportContent?: (email: string) => string | JSX.Element;

    /**
     * @param phoneSupportTitle The title for the phone support section
     * @returns string
     */
    phoneSupportTitle?: string;

    /**
     * @param phoneSupportContent The content for the phone support section
     * @returns string | JSX.Element
     */
    phoneSupportContent?: (phone: string) => string | JSX.Element;

    /**
     * @param contactEmail The email address to display in the email support section
     * @returns string
     */
    contactEmail?: string;

    /**
     * @param contactPhone The phone number to display in the phone support section
     * @returns string
     */
    contactPhone?: string;

    /**
     * @param dismissButtonLabel The text to display on the dismiss button
     * @returns string
     */
    dismissButtonLabel?: string;

    /**
     * @param onDismiss The function to call when the dismiss button is clicked
     * @returns void
     */
    onDismiss?: () => void;
};
