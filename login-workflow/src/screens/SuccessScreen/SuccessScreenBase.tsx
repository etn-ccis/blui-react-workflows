import React from 'react';
import { Divider } from '@mui/material';
import { WorkflowCard, WorkflowCardActions, WorkflowCardBody, WorkflowCardHeader } from '../../components/WorkflowCard';
import { SuccessScreenProps } from './types';
import { WorkflowFinishState } from '../../components';

/**
 * Component that renders a success screen
 *
 * @param icon the icon to be displayed on the screen
 * @param messageTitle title of the success message
 * @param message success message to be displayed on the screen
 * @param dismissButtonLabel to display label for the button
 * @param canDismiss function to call when the dismiss button is clicked
 * @param onDismiss function to call when user clicks button
 *
 * @category Component
 */

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { icon, messageTitle = '', message = '', dismissButtonLabel = '', canDismiss, onDismiss } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <WorkflowFinishState icon={icon} title={messageTitle} description={message} />
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
