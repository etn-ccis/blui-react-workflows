import React from 'react';
import { Divider } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from './WorkflowCard';
import { WorkflowCardBaseProps } from './WorkflowCard/WorkflowCard.types';
import { FinishState } from '../../components';

// WorkflowCardBaseProps = loading, background, error
type SuccessScreenProps = WorkflowCardBaseProps & {
    title?: string;
    icon?: JSX.Element;
    messageTitle?: string;
    message?: string;
    dismissButtonLabel?: string;
    canDismiss?: boolean | (() => boolean);
    onDismiss?: () => void;
};

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { title, icon, messageTitle, message, dismissButtonLabel, canDismiss, onDismiss } = props;
    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title} />
            <WorkflowCardBody>
                <FinishState icon={icon} title={messageTitle} description={message} />
            </WorkflowCardBody>
            <Divider />
            <WorkflowCardActions
                canGoNext={canDismiss}
                showNext={true}
                nextLabel={dismissButtonLabel}
                onNext={onDismiss}
                fullWidthButton={true}
            />
        </WorkflowCard>
    );
};
