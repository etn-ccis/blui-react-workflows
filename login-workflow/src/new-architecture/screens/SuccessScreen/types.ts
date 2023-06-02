import React from 'react';
import { WorkflowCardProps } from '../../components/WorkflowCard/WorkflowCard.types';

export type SuccessScreenProps = WorkflowCardProps & {
    icon?: JSX.Element;
    messageTitle?: string;
    message?: string | React.ReactNode;
    dismissButtonLabel?: string;
    canDismiss?: boolean | (() => boolean);
    onDismiss?: () => void;
};
