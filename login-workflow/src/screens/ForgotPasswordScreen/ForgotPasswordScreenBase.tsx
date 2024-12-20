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
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component renders a screen with forgot password for support with the application.
 *
 * @param {ForgotPasswordScreenProps} props - props of ForgotPasswordScreen base component
 *
 * @category Component
 */

export const ForgotPasswordScreenBase: React.FC<React.PropsWithChildren<ForgotPasswordScreenProps>> = (props) => {
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
        WorkflowCardBaseProps: cardBaseProps = {},
        WorkflowCardInstructionProps: instructionsProps = {},
        WorkflowCardActionsProps: actionsProps = {},
        WorkflowCardHeaderProps: headerProps = {},
        ...otherProps
    } = props;

    const validateEmail = (): boolean => typeof emailValidator(initialEmailValue) !== 'string';

    const [isEmailValid, setIsEmailValid] = useState(validateEmail);
    const [emailError, setEmailError] = useState(!validateEmail() ? emailValidator(initialEmailValue) : '');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(initialEmailValue !== '' || validateEmail);

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

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element => (SuccessScreen ? SuccessScreen(_props) : <SuccessScreenBase {..._props} />);

    return (
        <>
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
            ) : (
                <WorkflowCard {...cardBaseProps} {...otherProps}>
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
