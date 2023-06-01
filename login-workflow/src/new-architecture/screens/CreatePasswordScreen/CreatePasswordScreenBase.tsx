import React from 'react';
import { CreatePasswordScreenProps } from './types';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { SetPassword } from '../../components/SetPassword';

export const CreatePasswordScreenBase: React.FC<React.PropsWithChildren<CreatePasswordScreenProps>> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <SetPassword {...passwordProps} />
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider />
        </WorkflowCard>
    );
};
