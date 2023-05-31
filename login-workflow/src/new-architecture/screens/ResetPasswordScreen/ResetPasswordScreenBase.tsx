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
import { SuccessScreenBase } from '../SuccessScreen/SuccessScreenBase';
import { SuccessScreenProps } from '../SuccessScreen';

export const ResetPasswordScreenBase: React.FC<React.PropsWithChildren<ResetPasswordScreenProps>> = (props) => {
    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};
    const passwordProps = props.PasswordProps || { onPasswordChange: () => ({}) };
    const { showSuccessScreen, slots, slotProps } = props;

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        SuccessScreen: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (SuccessScreen ? SuccessScreen(_props) : <SuccessScreenBase {..._props} />);

    return showSuccessScreen ? (
        getSuccessScreen(slotProps.SuccessScreen, slots.SuccessScreen)
    ) : (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <SetPassword {...passwordProps} />
            </WorkflowCardBody>
            <WorkflowCardActions {...actionsProps} divider></WorkflowCardActions>
        </WorkflowCard>
    );
};
