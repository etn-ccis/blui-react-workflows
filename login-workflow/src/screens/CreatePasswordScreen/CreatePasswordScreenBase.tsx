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
    const {
        errorDisplayConfig,
        WorkflowCardBaseProps: cardBaseProps = {},
        WorkflowCardInstructionProps: instructionsProps = {},
        WorkflowCardActionsProps: actionsProps = {},
        WorkflowCardHeaderProps: headerProps = {},
        PasswordProps: passwordProps = { onPasswordChange: () => ({}) },
        ...otherProps
    } = props;

    return (
        <WorkflowCard {...cardBaseProps} {...otherProps}>
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
