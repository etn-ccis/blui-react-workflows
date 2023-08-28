import React from 'react';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type SuccessScreenProps = WorkflowCardProps & {
    /**
     * @param icon The icon to display in the header
     * @returns JSX.Element
     */
    icon?: JSX.Element;

    /**
     * @param messageTitle The title of the success message
     * @returns string
     */
    messageTitle?: string;

    /**
     * @param message The success message to be displayed on the screen
     * @returns string | React.ReactNode
     */
    message?: string | React.ReactNode;

    /**
     * @param dismissButtonLabel to display label for the button
     * @returns string
     */
    dismissButtonLabel?: string;

    /**
     * @param canDismiss The function to call when the dismiss button is clicked
     * @returns boolean
     */
    canDismiss?: boolean | (() => boolean);

    /**
     * @param onDismiss The function to call when user clicks button
     * @returns void
     */
    onDismiss?: () => void;

    /**
     * @param errorDisplayConfig The configuration for customizing how errors are displayed
     * @returns ErrorManagerProps
     */
    errorDisplayConfig?: ErrorManagerProps;
};
