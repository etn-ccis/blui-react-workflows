import React from 'react';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type SuccessScreenProps = WorkflowCardProps & {
    /**
     * The icon to display in the header
     */
    icon?: JSX.Element;

    /**
     * The title of the success message
     */
    messageTitle?: string;

    /**
     * The success message to be displayed on the screen
     */
    message?: string | React.ReactNode;

    /**
     * To display label for the button
     */
    dismissButtonLabel?: string;

    /**
     * The function to call when the dismiss button is clicked
     */
    canDismiss?: boolean | (() => boolean);

    /**
     * The function to call when user clicks button
     * @returns void
     */
    onDismiss?: () => void;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
