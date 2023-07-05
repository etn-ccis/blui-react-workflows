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
import { SuccessScreenBase } from '../SuccessScreen';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Trans } from 'react-i18next';
import { useAuthContext } from '../../contexts';

export const ForgotPasswordScreenBase: React.FC<React.PropsWithChildren<ForgotPasswordScreenProps>> = (props) => {
    const { navigate, routeConfig } = useAuthContext();
    const { t } = useLanguageLocale();
    const [emailInput, setEmailInput] = useState(props.initialEmailValue ? props.initialEmailValue : '');

    const {
        emailLabel,
        initialEmailValue = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        emailValidator = (email: string): boolean | string => true,
        onNext,
        onBack,
        slotProps = {},
        slots = {
            SuccessScreen: (
                <SuccessScreenBase
                    WorkflowCardHeaderProps={{ title: t('bluiAuth:HEADER.FORGOT_PASSWORD') }}
                    icon={<CheckCircle color="primary" sx={{ fontSize: 100, mb: 5 }} />}
                    messageTitle={t('bluiCommon:MESSAGES.EMAIL_SENT')}
                    message={
                        <Trans i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'} values={{ email: emailInput }}>
                            Link has been sent to <b>{emailInput}</b>.
                        </Trans>
                    }
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        canGoNext: true,
                        onNext: (): void => {
                            navigate(routeConfig.LOGIN);
                        },
                        fullWidthButton: true,
                    }}
                    {...slotProps.SuccessScreen}
                />
            ),
        },
    } = props;

    const cardBaseProps = props.WorkflowCardBaseProps || {};
    const headerProps = props.WorkflowCardHeaderProps || {};
    const instructionsProps = props.WorkflowCardInstructionProps || {};
    const actionsProps = props.WorkflowCardActionsProps || {};

    const [isEmailValid, setIsEmailValid] = useState(emailValidator(initialEmailValue) ?? false);
    const [emailError, setEmailError] = useState('');
    const [shouldValidateEmail, setShouldValidateEmail] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState('');

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
        if (onNext) {
            const result = onNext(emailInput);
            setShowSuccessScreen(typeof result === 'boolean' && result);
            setShowErrorDialog(typeof result === 'string' ? result : '');
        }
        actionsProps?.onNext?.();
    };

    const handleOnPrevious = (): void => {
        if (onBack) onBack(emailInput);
        actionsProps?.onPrevious?.();
    };

    return (
        <>
            {showSuccessScreen ? (
                slots.SuccessScreen
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
                        onPrevious={handleOnPrevious}
                    />
                </WorkflowCard>
            )}
        </>
    );
};
