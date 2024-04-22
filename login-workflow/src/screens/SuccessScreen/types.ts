import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';
import { EmptyStateProps } from '@brightlayer-ui/react-components';

export type SuccessScreenProps = WorkflowCardProps & {
    /**
     * To pass EmptyStateProps i.e icon, title, description... etc
     */
    EmptyStateProps?: EmptyStateProps;

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
