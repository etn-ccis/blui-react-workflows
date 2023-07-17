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
import ErrorManager from '../../components/Error/ErrorManager';

export const CreatePasswordScreenBase: React.FC<React.PropsWithChildren<CreatePasswordScreenProps>> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { errorDisplayConfig } = props;

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps} />
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps} />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider />
        </WorkflowCard>
    );
};
