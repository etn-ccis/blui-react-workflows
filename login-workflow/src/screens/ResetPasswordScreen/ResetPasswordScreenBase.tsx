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
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';

/**
 * Component that renders a ResetPassword screen that allows a user to reset their password and shows a success message upon a successful password reset..
 *
 * @param {ResetPasswordScreenProps} props - props of resetPasswordScreen base component
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

    const getSuccessScreen = (
        _props?: SuccessScreenProps,
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (SuccessScreen ? SuccessScreen(_props || {}) : <SuccessScreenBase {..._props} />);

    return (
        <>
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen, slots?.SuccessScreen)
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
