import React from 'react';
import { Divider } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { WorkflowFinishState } from '../../components';

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { title, icon, messageTitle, message, dismissButtonLabel, canDismiss, onDismiss } = props;
    return (
        <WorkflowCard>
            <WorkflowCardHeader title={title} />
            <WorkflowCardBody>
                <WorkflowFinishState icon={icon} title={messageTitle} description={message} />
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
