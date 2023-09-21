import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
    WorkflowCard,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardHeader,
    WorkflowCardInstructions,
} from '../../components';
import { ForgotPasswordScreenProps } from './types';
import { SuccessScreenProps } from '../SuccessScreen';
import ErrorManager from '../../components/Error/ErrorManager';

type ForgotPasswordScreenBaseProps = Omit<ForgotPasswordScreenProps, 'slots'> & {
    slots: { SuccessScreen: (props: SuccessScreenProps) => JSX.Element };
};

/**
 * Component renders a screen with forgot password for support with the application.
 *
 * @param emailLabel label for the email field
 * @param initialEmailValue initial value for the email text field
 * @param emailValidator function used to test the input for valid formatting
 * @param canGoNext boolean or function that indicates whether the next button should be enabled
 * @param showSuccessScreen used to determine whether to show a success screen after the form is submitted
 * @param slots used for ForgotPasswordScreen SuccessScreen
 * @param slotProps applied to slot from SuccessScreen
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 * @param emailTextFieldProps props to pass to the email field.
 *
 * @category Component
 */

export const ForgotPasswordScreenBase: React.FC<React.PropsWithChildren<ForgotPasswordScreenBaseProps>> = (props) => {
    const [emailInput, setEmailInput] = useState(props.initialEmailValue ?? '');

    const {
        emailLabel,
        initialEmailValue = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string => true,
        slots,
        slotProps = {},
        showSuccessScreen,
        errorDisplayConfig,
        emailTextFieldProps,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const validateEmail = (): boolean => typeof emailValidator(initialEmailValue) !== 'string';

    const [isEmailValid, setIsEmailValid] = useState(validateEmail);
    const [emailError, setEmailError] = useState(validateEmail ? emailValidator(initialEmailValue) : '');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(initialEmailValue !== '' ?? validateEmail);

    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);

            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );

    const handleOnNext = (): void => {
        const { onNext } = actionsProps;
        if (onNext) {
            onNext({ email: emailInput });
        }
    };

    return (
        <>
            {showSuccessScreen ? (
                <slots.SuccessScreen {...slotProps.SuccessScreen} />
            ) : (
                <WorkflowCard {...cardBaseProps}>
                    <WorkflowCardHeader {...headerProps} />
                    <WorkflowCardInstructions {...instructionsProps} />
                    <WorkflowCardBody>
                        <ErrorManager {...errorDisplayConfig}>
                            <TextField
                                id="email"
                                label={emailLabel}
                                fullWidth
                                value={emailInput}
                                variant="filled"
                                error={shouldValidateEmail && !isEmailValid}
                                helperText={shouldValidateEmail && emailError}
                                {...emailTextFieldProps}
                                onBlur={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    emailTextFieldProps?.onBlur && emailTextFieldProps.onBlur(e);
                                    setShouldValidateEmail(true);
                                }}
                                onChange={(evt): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    emailTextFieldProps?.onChange && emailTextFieldProps.onChange(evt);
                                    handleEmailInputChange(evt.target.value);
                                }}
                                onKeyUp={(e): void => {
                                    if (
                                        e.key === 'Enter' &&
                                        ((emailInput.length > 0 && isEmailValid) || actionsProps.canGoNext)
                                    )
                                        handleOnNext();
                                }}
                            />
                        </ErrorManager>
                    </WorkflowCardBody>
                    <WorkflowCardActions
                        {...actionsProps}
                        canGoNext={emailInput.length > 0 && isEmailValid && actionsProps.canGoNext}
                        onNext={handleOnNext}
                    />
                </WorkflowCard>
            )}
        </>
    );
};
