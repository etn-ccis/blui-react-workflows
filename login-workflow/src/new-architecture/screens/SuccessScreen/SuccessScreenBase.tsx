import React from 'react';
import { Divider } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { WorkflowFinishState } from '../../components';
import ErrorManager from '../../components/Error/ErrorManager';

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const {
        icon,
        messageTitle = '',
        message = '',
        dismissButtonLabel = '',
        canDismiss,
        onDismiss,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <WorkflowFinishState icon={icon} title={messageTitle} description={message} />
                </ErrorManager>
            </WorkflowCardBody>
            <Divider />
            <WorkflowCardActions
                {...actionsProps}
                nextLabel={dismissButtonLabel || actionsProps.nextLabel}
                canGoNext={canDismiss}
                onNext={(): void => {
                    if (onDismiss) onDismiss();
                    if (actionsProps.onNext) actionsProps.onNext();
                }}
            />
        </WorkflowCard>
    );
};
