import React, { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../contexts';
import { ForgotPasswordScreenBase } from './ForgotPasswordScreenBase';
import { ForgotPasswordScreenProps } from './types';
import Typography from '@mui/material/Typography';
import { SuccessScreenBase } from '../SuccessScreen';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { LinkStyles } from '../../styles';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

/**
 * Component renders a screen with forgot password for support with the application.
 *
 * @param emailLabel label for the email field
 * @param initialEmailValue initial value for the email text field
 * @param emailValidator function used to test the input for valid formatting
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

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const { actions, navigate, routeConfig } = useAuthContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };

    const [emailInput, setEmailInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const handleOnNext = useCallback(
        async (email: string): Promise<void> => {
            try {
                setIsLoading(true);
                await actions.forgotPassword(email);
                setShowSuccessScreen(true);
            } catch (_error) {
                triggerError(_error as Error);
            } finally {
                setIsLoading(false);
            }
        },
        [actions, triggerError]
    );

    const {
        emailLabel = t('bluiCommon:LABELS.EMAIL'),
        contactPhone = '1-800-123-4567',
        initialEmailValue,
        description,
        responseTime = 'one business day',
        emailValidator = (email: string): boolean | string =>
            new RegExp(EMAIL_REGEX).test(email) ? true : t('bluiCommon:MESSAGES.EMAIL_ENTRY_ERROR'),
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        showSuccessScreen: enableSuccessScreen = true,
        slotProps = { SuccessScreen: {} },
        slots,
        emailTextFieldProps,
    } = props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardInstructionProps = {
        instructions: description ? (
            <Box sx={{ px: { md: 3, xs: 2 }, pt: 2 }}> {description(responseTime)} </Box>
        ) : (
            <Typography sx={{ px: { md: 3, xs: 2 }, pt: 2 }}>
                <Trans
                    i18nKey={'bluiAuth:FORGOT_PASSWORD.INSTRUCTIONS_ALT'}
                    values={{ phone: contactPhone, time: responseTime }}
                >
                    Please enter your email, we will respond in <b>{responseTime}</b>. For urgent issues please call{' '}
                    <Typography component="a" href={`tel:${contactPhone}`} sx={LinkStyles}>
                        {contactPhone}
                    </Typography>
                    {'.'}
                </Trans>
            </Typography>
        ),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        showPrevious: true,
        nextLabel: t('bluiCommon:ACTIONS.SUBMIT'),
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoNext: true,
        canGoPrevious: true,
        ...WorkflowCardActionsProps,
        onNext: (data: any): void => {
            setEmailInput(data.email);
            void handleOnNext(data.email);
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    return (
        <ForgotPasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            emailLabel={emailLabel}
            initialEmailValue={initialEmailValue}
            emailValidator={emailValidator}
            emailTextFieldProps={emailTextFieldProps}
            showSuccessScreen={enableSuccessScreen && showSuccessScreen}
            slots={{
                SuccessScreen:
                    slots?.SuccessScreen ??
                    ((): JSX.Element => (
                        <SuccessScreenBase
                            icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 5 }} />}
                            messageTitle={t('bluiCommon:MESSAGES.EMAIL_SENT')}
                            message={
                                <Box
                                    sx={{
                                        overflow: 'hidden',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                    }}
                                    component={'span'}
                                >
                                    <Trans
                                        i18nKey={'bluiAuth:FORGOT_PASSWORD.LINK_SENT_ALT'}
                                        values={{ email: emailInput }}
                                    >
                                        Link has been sent to <b>{emailInput}</b>.
                                    </Trans>
                                </Box>
                            }
                            {...slotProps.SuccessScreen}
                            WorkflowCardHeaderProps={{
                                title: t('bluiAuth:HEADER.FORGOT_PASSWORD'),
                                ...slotProps?.SuccessScreen?.WorkflowCardHeaderProps,
                            }}
                            WorkflowCardActionsProps={{
                                showNext: true,
                                nextLabel: t('bluiCommon:ACTIONS.DONE'),
                                canGoNext: true,
                                fullWidthButton: true,
                                ...slotProps?.SuccessScreen?.WorkflowCardActionsProps,
                                onNext: (): void => {
                                    navigate(routeConfig.LOGIN as string);
                                    if (slotProps?.SuccessScreen?.WorkflowCardActionsProps)
                                        slotProps?.SuccessScreen?.WorkflowCardActionsProps?.onNext?.();
                                },
                            }}
                        />
                    )),
            }}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
