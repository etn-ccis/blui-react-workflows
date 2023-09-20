import React from 'react';
import { ResetPasswordScreenProps } from './types';
import {
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardInstructions,
    SetPassword,
    WorkflowCardActions,
} from '../../components';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param PasswordProps props that will be passed to the SetPassword component
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ResetPasswordScreen SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param SuccessScreen component that will be rendered when showSuccessScreen is true
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @returns a React JSX Element that renders a ResetPassword screen
 *
 * @category Component
 *
 */

export const ResetPasswordScreenBase: React.FC<React.PropsWithChildren<ResetPasswordScreenProps>> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { showSuccessScreen, slots, slotProps = {}, errorDisplayConfig } = props;

    return (
        <>
            {showSuccessScreen ? (
                <slots.SuccessScreen {...slotProps.SuccessScreen} />
            ) : (
                <WorkflowCard {...cardBaseProps}>
                    <WorkflowCardHeader {...headerProps} />
                    <WorkflowCardInstructions {...instructionsProps} divider />
                    <WorkflowCardBody>
                        <ErrorManager {...errorDisplayConfig}>
                            <SetPassword {...passwordProps} />
                        </ErrorManager>
                    </WorkflowCardBody>
                    <WorkflowCardActions {...actionsProps} divider />
                </WorkflowCard>
            )}
        </>
    );
};
