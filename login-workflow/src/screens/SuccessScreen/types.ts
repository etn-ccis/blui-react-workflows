import { ReactNode } from 'react';
import { ErrorManagerProps } from '../../components/Error';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type SuccessScreenProps = WorkflowCardProps & {
    icon?: JSX.Element;
    messageTitle?: string;
    message?: ReactNode;
    dismissButtonLabel?: string;
    canDismiss?: boolean | (() => boolean);
    onDismiss?: () => void;
    errorDisplayConfig?: ErrorManagerProps;
};
