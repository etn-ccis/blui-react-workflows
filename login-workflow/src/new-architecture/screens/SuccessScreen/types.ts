import { WorkflowCardBaseProps } from '../../components/WorkflowCard/WorkflowCard.types';

// WorkflowCardBaseProps = loading, background, error
export type SuccessScreenProps = WorkflowCardBaseProps & {
    title?: string;
    icon?: JSX.Element;
    messageTitle?: string;
    message?: string;
    dismissButtonLabel?: string;
    canDismiss?: boolean | (() => boolean);
    onDismiss?: () => void;
};
