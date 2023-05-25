import React, { useCallback } from 'react';
import { CreatePasswordScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetPassword } from '../../components/SetPassword';

// /**
//  * Component that renders a screen that prompts a user to enter the confirmation code
//  * that was sent to the email address that they used to register.
//  *
//  * @param codeValidator used to test the input for valid formatting
//  * @param onResend function to call when the user clicks the 'resend code' button
//  * @param resendInstructions text to display ahead of the resend link/button
//  * @param resendLabel label for the resend link/button
//  * @param initialValue code used to pre-populate the field
//  *
//  * @category Component
//  */

export const CreatePasswordScreenBase: React.FC<React.PropsWithChildren<CreatePasswordScreenProps>> = (props) => {
    // const {
    //     title,
    //     instructions,
    //     ...otherProps
    // } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    // const passwordProps = props.PasswordProps || {}


    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                {/* <SetPassword
                        passwordRef={passwordProps.passwordRef}
                        confirmRef={passwordProps.confirmRef}
                        initialNewPasswordValue={passwordProps.passwordInput}
                        initialConfirmPasswordValue={passwordProps.confirmInput}
                        onPasswordChange={passwordProps.onPasswordChange}
                        onSubmit={(): void => {}}
                    /> */}
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                divider
                // canGoNext={verifyCode.length > 0 && isCodeValid && actionsProps.canGoNext}
            ></WorkflowCardActions>
        </WorkflowCard>
    );
};
