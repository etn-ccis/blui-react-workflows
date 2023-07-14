import React, { useCallback } from 'react';
import { CreateAccountScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardActions } from '../../components/WorkflowCard/WorkflowCardActions';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import { WorkflowCardInstructions } from '../../components/WorkflowCard/WorkflowCardInstructions';
import TextField from '@mui/material/TextField';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param emailLabel label for the textfield
 * @param initialValue used to pre-populate the email input field
 * @param emailValidator used to test the input for valid formatting
 * @param emailTextFieldProps props to pass to the email text field
 *
 * @category Component
 */

export const CreateAccountScreenBase: React.FC<
    React.PropsWithChildren<CreateAccountScreenProps & { inputRef?: any }>
> = (props) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string => true,
        emailLabel,
        initialValue,
        emailTextFieldProps,
        inputRef,
        errorDisplayConfig,
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [emailInput, setEmailInput] = React.useState(initialValue ? initialValue : '');
    const [isEmailValid, setIsEmailValid] = React.useState(emailValidator(initialValue) ?? false);
    const [emailError, setEmailError] = React.useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = React.useState(false);

    const handleEmailInputChange = useCallback(
        (email: string) => {
            setEmailInput(email);
            const emailValidatorResponse = emailValidator(email);

            setIsEmailValid(typeof emailValidatorResponse === 'boolean' ? emailValidatorResponse : false);
            setEmailError(typeof emailValidatorResponse === 'string' ? emailValidatorResponse : '');
        },
        [emailValidator]
    );

    return (
        <WorkflowCard {...cardBaseProps}>
            <WorkflowCardHeader {...headerProps}></WorkflowCardHeader>
            <WorkflowCardBody>
                <WorkflowCardInstructions {...instructionsProps} divider />
                <ErrorManager {...errorDisplayConfig}>
                    <TextField
                        ref={inputRef}
                        type={'email'}
                        label={emailLabel}
                        fullWidth
                        value={emailInput}
                        variant="filled"
                        error={shouldValidateEmail && !isEmailValid}
                        helperText={shouldValidateEmail && emailError}
                        {...emailTextFieldProps}
                        onChange={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            emailTextFieldProps?.onChange && emailTextFieldProps.onChange(e);
                            handleEmailInputChange(e.target.value);
                        }}
                        onKeyUp={(e): void => {
                            if (e.key === 'Enter' && emailInput.length > 0 && isEmailValid && actionsProps.canGoNext)
                                actionsProps?.onNext?.();
                        }}
                        onBlur={(e): void => {
                            // eslint-disable-next-line no-unused-expressions
                            emailTextFieldProps?.onBlur && emailTextFieldProps.onBlur(e);
                            setShouldValidateEmail(true);
                        }}
                    />
                </ErrorManager>
            </WorkflowCardBody>
            <WorkflowCardActions
                {...actionsProps}
                divider
                canGoNext={emailInput.length > 0 && isEmailValid && actionsProps.canGoNext}
            ></WorkflowCardActions>
        </WorkflowCard>
    );
};
