import React from 'react';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components/WorkflowCard';
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
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 *
 * @category Component
 */

export const SuccessScreenBase: React.FC<SuccessScreenProps> = (props) => {
    const { icon, messageTitle = '', message = '', dismissButtonLabel = '', canDismiss, onDismiss } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            {Object.keys(instructionsProps).length !== 0 && <WorkflowCardInstructions {...instructionsProps} />}
            <WorkflowCardBody>
                <WorkflowFinishState icon={icon} title={messageTitle} description={message} />
            </WorkflowCardBody>
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
