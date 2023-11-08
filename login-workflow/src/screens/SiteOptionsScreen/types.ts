import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { ErrorManagerProps } from '../../components/Error';
import { ReactNode } from 'react';

export type SiteOptionsScreenProps = WorkflowCardProps & {
    /**
     * The icon to display in the header
     */
    icon?: JSX.Element;

    /**
     * The success message to be displayed on the screen
     */
    message?: ReactNode;

    /**
     * To display label for the next button
     */
    nextButtonLabel?: string;

    /**
     * To display label for the previous button
     */
    previousButtonLabel?: string;

    /**
     * The function to call when user wants to join existing organization
     * @returns void
     */
    onJoinExistingOrganization?: () => void;

    /**
     * The function to call when user wants to create a new  organization
     * @returns void
     */
    onCreateNewOrganization?: () => void;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
