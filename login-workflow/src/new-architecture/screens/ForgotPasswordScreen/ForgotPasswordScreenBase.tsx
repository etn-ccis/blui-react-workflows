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
        if (actionsProps.onNext) {
            const result = actionsProps.onNext({ email: emailInput });
            setShowSuccessScreen(typeof result === 'boolean' && result);
            setShowErrorDialog(typeof result === 'string' ? result : '');
        }
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
                        <WorkflowCardInstructions divider {...instructionsProps} />
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
