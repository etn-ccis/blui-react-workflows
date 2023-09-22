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
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param PasswordProps props passed from SetPassword component
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
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
