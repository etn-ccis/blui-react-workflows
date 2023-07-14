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

type ForgotPasswordScreenBaseProps = Omit<ForgotPasswordScreenProps, 'slots'> & {
    slots: { SuccessScreen: (props: SuccessScreenProps) => JSX.Element };
};

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
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [isEmailValid, setIsEmailValid] = useState(emailValidator(initialEmailValue) ?? false);
    const [emailError, setEmailError] = useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(false);

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
                    <WorkflowCardBody>
                        <WorkflowCardInstructions divider {...instructionsProps} />
                        <TextField
                            id="email"
                            label={emailLabel}
                            fullWidth
                            value={emailInput}
                            onChange={(evt): void => {
                                handleEmailInputChange(evt.target.value);
                            }}
                            onKeyUp={(e): void => {
                                if (
                                    e.key === 'Enter' &&
                                    emailInput.length > 0 &&
                                    isEmailValid &&
                                    actionsProps.canGoNext
                                )
                                    handleOnNext();
                            }}
                            variant="filled"
                            error={shouldValidateEmail && !isEmailValid}
                            helperText={shouldValidateEmail && emailError}
                            onBlur={(): void => setShouldValidateEmail(true)}
                        />
                    </WorkflowCardBody>
                    <WorkflowCardActions
                        divider
                        {...actionsProps}
                        canGoNext={emailInput.length > 0 && isEmailValid && actionsProps.canGoNext}
                        onNext={handleOnNext}
                    />
                </WorkflowCard>
            )}
        </>
    );
};
