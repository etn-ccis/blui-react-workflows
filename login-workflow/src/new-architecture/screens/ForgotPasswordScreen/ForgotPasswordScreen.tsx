import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { CheckCircle } from '@mui/icons-material';
import { SimpleDialog } from '../../../components';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase } from '../SuccessScreen';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';
import { LinkStyles } from '../../../styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig } = useAuthContext();

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const {
        title = t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
        },
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title,
        },
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        contactPhone = '1-800-123-4567',
        initialEmailValue,
        description,
        responseTime = 'one business day',
        emailValidator = (email: string): boolean | string =>
            new RegExp(EMAIL_REGEX).test(email) ? true : t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR'),
        showBackButton = true,
        backButtonLabel = t('bluiCommon:ACTIONS.BACK'),
        nextButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        canGoNext,
        canGoBack,
        showNextButton = true,
        onNext = (email): boolean | string => {
            setEmailInput(email);
            return true;
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: description ? (
                <> {description} </>
            ) : (
                <Typography>
                    <Trans
                        i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS_ALT'}
                        values={{ phone: contactPhone, responseTime }}
                    >
                        Please enter your email, we will respond in <b>{responseTime}</b>. For urgent issues please call{' '}
                        <Box component="a" href={`tel:${contactPhone}`} sx={LinkStyles}>
                            {contactPhone}
                        </Box>
                        .
                    </Trans>
                </Typography>
            ),
        },
        WorkflowCardActionsProps: workflowCardActionsProps = {
            onNext: (): void => {
                try {
                    setIsLoading(true);
                    void actions().forgotPassword(emailInput);
                    setIsLoading(false);
                } catch (e) {
                    setShowErrorDialog(true);
                }
            },
            onPrevious: (): void => {
                try {
                    setIsLoading(true);
                    navigate(routeConfig.LOGIN);
                    setIsLoading(false);
                } catch (e) {
                    setShowErrorDialog(true);
                }
            },
            showNext: showNextButton,
            showPrevious: showBackButton,
            nextLabel: nextButtonLabel,
            previousLabel: backButtonLabel,
            canGoNext,
            canGoPrevious: canGoBack,
        },
    } = props;

    const errorDialog = (
        <SimpleDialog
            title={t('bluiAuth:MESSAGES.ERROR')}
            body={t('bluiAuth:FORGOT_PASSWORD.ERROR')}
            open={showErrorDialog}
            onClose={(): void => {
                setShowErrorDialog(false);
            }}
        />
    );

    return (
        <>
            {showErrorDialog ? (
                errorDialog
            ) : (
                <ForgotPasswordScreenBase
                    WorkflowCardBaseProps={workflowCardBaseProps}
                    WorkflowCardHeaderProps={workflowCardHeaderProps}
                    WorkflowCardInstructionProps={workflowCardInstructionProps}
                    WorkflowCardActionsProps={workflowCardActionsProps}
                    emailLabel={emailLabel}
                    initialEmailValue={initialEmailValue}
                    emailValidator={emailValidator}
                    onNext={onNext}
                    slots={{
                        SuccessScreen: () => (
                            <SuccessScreenBase
                                WorkflowCardHeaderProps={{ title: t('bluiAuth:HEADER.FORGOT_PASSWORD') }}
                                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 5 }} />}
                                messageTitle={t('bluiCommon:MESSAGES.EMAIL_SENT')}
                                message={
                                    <Trans
                                        i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'}
                                        values={{ email: emailInput }}
                                    >
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
                                {...props}
                            />
                        ),
                    }}
                />
            )}
        </>
    );
};
