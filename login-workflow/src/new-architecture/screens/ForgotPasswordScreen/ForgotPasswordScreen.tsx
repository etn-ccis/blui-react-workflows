import { CheckCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { SimpleDialog } from '../../../components';
import { LinkStyles } from '../../../styles';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase } from '../SuccessScreen';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig } = useAuthContext();

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailValidator = (email: string): boolean | string =>
        new RegExp(EMAIL_REGEX).test(email) ? true : t('bluiAuth:MESSAGES.EMAIL_ENTRY_ERROR');

    const {
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
        },
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        },
        contactPhone = '',
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: (
                <Box>
                    <Trans i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS_ALT'} values={{ phone: contactPhone }}>
                        Please enter the account email associated with the account. If this email has an account with
                        Eaton, you will receive a response within <b>one business day</b>. For urgent account issues,
                        please call{' '}
                        <Box component="a" href={`tel:${contactPhone}`} sx={LinkStyles}>
                            {contactPhone}
                        </Box>
                        .
                    </Trans>
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
            nextLabel: t('bluiAuth:ACTIONS.NEXT'),
            previousLabel: t('bluiAuth:ACTIONS.BACK'),
            canGoNext: true,
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
                                    nextLabel: t('bluiAuth:ACTIONS.OKAY'),
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
