import React from 'react';
import { ResetPasswordScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
// import { SetPassword } from '../../components/SetPassword';

export const ResetPasswordScreenBase: React.FC<React.PropsWithChildren<ResetPasswordScreenProps>> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    // const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                {/* <SetPassword {...passwordProps} /> */}
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider></WorkflowCardActions>
        </WorkflowCard>
    );
};
