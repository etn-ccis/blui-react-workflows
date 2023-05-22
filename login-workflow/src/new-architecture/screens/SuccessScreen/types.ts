import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type SuccessScreenProps = WorkflowCardProps & {
    icon?: JSX.Element;
    messageTitle?: string;
    message?: string;
    dismissButtonLabel?: string;
    canDismiss?: boolean | (() => boolean);
    onDismiss?: () => void;
};
