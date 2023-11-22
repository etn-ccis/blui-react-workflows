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
     * Boolean or function that indicates whether the join existing organization button should be enabled
     */
    canJoinExistingOrg?: boolean | (() => boolean);

    /**
     * Boolean or function that indicates whether the create new organization button should be enabled
     */
    canCreateNewOrg?: boolean | (() => boolean);

    /**
     * To display label for the custom button which redirects to existing organization flow
     */
    joinExistingOrgLabel?: string;

    /**
     * To display label for the custom button which redirects create new organization flow
     */
    createNewOrgLabel?: string;

    /**
     * The function to call when user wants to join existing organization
     * @returns void
     */
    onJoinExistingOrg?: () => void;

    /**
     * The function to call when user wants to create a new  organization
     * @returns void
     */
    onCreateNewOrg?: () => void;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
