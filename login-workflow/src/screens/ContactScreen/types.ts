import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type ContactSupportScreenProps = WorkflowCardProps & {
    icon?: JSX.Element;

    /**
     * The title for the email support section
     */
    emailSupportTitle?: string;

    /**
     * The content for the email support section
     * @param {string} email - the email address for contacting support
     * @returns string | JSX.Element
     */
    emailSupportContent?: (email: string) => string | JSX.Element;

    /**
     * The title for the phone support section
     */
    phoneSupportTitle?: string;

    /**
     * The content for the phone support section
     * @param {string} phone - the phone number for contacting support
     * @returns string | JSX.Element
     */
    phoneSupportContent?: (phone: string) => string | JSX.Element;

    /**
     * The email address to display in the email support section
     */
    contactEmail?: string;

    /**
     * The phone number to display in the phone support section
     */
    contactPhone?: string;

    /**
     * The text to display on the dismiss button
     */
    dismissButtonLabel?: string;

    /**
     * The function to call when the dismiss button is clicked
     * @returns void
     */
    onDismiss?: () => void;
};
