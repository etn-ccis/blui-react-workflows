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

/**
 * The component renders a screen with the password and confirm password field for creating a new password.
 *
 * @param {CreatePasswordScreenProps} props - props of CreatePasswordScreen base component
 *
 * @category Component
 */

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
            <WorkflowCardInstructions {...instructionsProps} />
            <WorkflowCardBody>
                <ErrorManager {...errorDisplayConfig}>
                    <SetPassword {...passwordProps} />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} />
        </WorkflowCard>
    );
};
