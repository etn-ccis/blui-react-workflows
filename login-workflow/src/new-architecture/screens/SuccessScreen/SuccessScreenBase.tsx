import React from 'react';
import { Divider } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { WorkflowFinishState } from '../../components';

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { icon, messageTitle, message } = props;

    const cardBaseProps = props.WorkflowCardBaseProps;
    const headerProps = props.WorkflowCardHeaderProps;
    const actionsProps = props.WorkflowCardActionsProps;

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <WorkflowFinishState icon={icon} title={messageTitle} description={message} />
            </WorkflowCardBody>
            <Divider />
            <WorkflowCardActions {...actionsProps} />
        </WorkflowCard>
    );
};
