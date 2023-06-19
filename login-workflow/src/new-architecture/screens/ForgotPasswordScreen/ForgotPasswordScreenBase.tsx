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
import { SimpleDialog } from '../../../components';
import { useLanguageLocale } from '../../hooks';

/**
 * Component that renders a screen for the user to enter their email address to start the
 * forgot password process.
 *
 * @param emailLabel label for the textfield
 *
 * @param initialEmailValue used to pre-populate the email input field
 *
 * @param emailValidator used to test the input for valid formatting
 *
 * @param onNext used to handle next button click
 *
 * @param slots used for each slot in `ForgotPasswordScreenBase`
 *
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const ForgotPasswordScreenBase: React.FC<React.PropsWithChildren<ForgotPasswordScreenProps>> = (props) => {
    const {
        emailLabel,
        initialEmailValue = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string => true,
        slotProps = {},
        slots: { SuccessScreen } = {},
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [emailInput, setEmailInput] = useState(initialEmailValue);
    const [isEmailValid, setIsEmailValid] = useState(emailValidator(initialEmailValue) ?? false);
    const [emailError, setEmailError] = useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState('');
    const { t } = useLanguageLocale();

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
        const result = props.onNext(emailInput);
        setShowSuccessScreen(typeof result === 'boolean' && result);
        setShowErrorDialog(typeof result === 'string' ? result : '');
        actionsProps?.onNext?.();
    };

    return (
        <>
            {showSuccessScreen ? (
                <SuccessScreen {...slotProps.SuccessScreen} />
            ) : (
                <WorkflowCard {...cardBaseProps}>
                    {showErrorDialog && (
                        <SimpleDialog
                            title={t('bluiCommon:MESSAGES.ERROR')}
                            body={showErrorDialog}
                            open={showErrorDialog.length > 0}
                            onClose={(): void => {
                                setShowErrorDialog('');
                            }}
                        />
                    )}
                    <WorkflowCardHeader {...headerProps} />
                    <WorkflowCardBody>
                        <WorkflowCardInstructions {...instructionsProps} divider />
                        <TextField
                            id="email"
                            label={emailLabel}
                            fullWidth
                            value={emailInput}
                            onChange={(evt): void => {
                                handleEmailInputChange(evt.target.value);
                            }}
                            onKeyPress={(e): void => {
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
                            helperText={(shouldValidateEmail && emailError) || showErrorDialog}
                            onBlur={(): void => setShouldValidateEmail(true)}
                        />
                    </WorkflowCardBody>
                    <WorkflowCardActions
                        {...actionsProps}
                        divider
                        canGoNext={emailInput.length > 0 && isEmailValid && actionsProps.canGoNext}
                        onNext={handleOnNext}
                    />
                </WorkflowCard>
            )}
        </>
    );
};
