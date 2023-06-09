import { CheckCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { SimpleDialog } from '../../../components';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase } from '../SuccessScreen';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const emailValidator = (email: string): boolean | string =>
    new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email';

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig } = useAuthContext();

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const {
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: (
                <Box>
                    <Trans i18nKey={'blui:FORGOT_PASSWORD.INSTRUCTIONS_ALT'}>
                        Please enter the account email associated with the account.
                        <Box sx={{ my: 3 }}>
                            If this email has an account with Eaton, you will receive a response within{' '}
                            <Box fontWeight="fontWeightBold" display="inline">
                                one business day
                            </Box>
                            .
                        </Box>
                        For urgent account issues, please call{' '}
                    </Trans>
                    <Box fontWeight="fontWeightMedium" display="inline" color={'primary.main'}>
                        1-800-123-4567
                    </Box>
                    .
                </Box>
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
            showNext: true,
            showPrevious: true,
            nextLabel: 'Next',
            previousLabel: 'Back',
            canGoNext: true,
        },
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
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
                    emailLabel={t('bluiAuth:LABELS.EMAIL')}
                    initialEmailValue={''}
                    emailValidator={emailValidator}
                    onNext={(email): boolean | string => {
                        setEmailInput(email);
                        return true;
                    }}
                    slots={{
                        SuccessScreen: () => (
                            <SuccessScreenBase
                                WorkflowCardHeaderProps={{ title: t('bluiAuth:HEADER.FORGOT_PASSWORD') }}
                                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 5 }} />}
                                messageTitle={t('bluiAuth:MESSAGES.EMAIL_SENT')}
                                message={
                                    <Trans
                                        i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'}
                                        values={{ email: emailInput }}
                                    >
                                        Link has been sent to <b>{emailInput}</b>
                                    </Trans>
                                }
                                WorkflowCardActionsProps={{
                                    showNext: true,
                                    nextLabel: 'Done',
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
