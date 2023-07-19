import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { SuccessScreenBase, SuccessScreenProps } from '..';
import { useRegistrationWorkflowContext, useRegistrationContext } from '../../contexts';
import { useErrorContext } from '../../contexts/ErrorContext';

export const RegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { navigate, routeConfig } = useRegistrationContext();
    const { t } = useTranslation();
    const errorConfig = useErrorContext();

    const {
        screenData: {
            AccountDetails: { firstName, lastName },
            CreateAccount: { emailAddress: email },
            Other: {
                RegistrationSuccessScreen: { organizationName: organization },
            },
        },
    } = useRegistrationWorkflowContext();

    const {
        icon = <CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        message = (
            <Typography variant="subtitle2">
                <Trans i18nKey={'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT'} values={{ email, organization }}>
                    Your account has successfully been created with the email <b>{email}</b> belonging to the
                    <b>{` ${String(organization)}`}</b> org.
                </Trans>
            </Typography>
        ),
        onDismiss = (): void => navigate(routeConfig.LOGIN),
        canDismiss = true,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        errorDisplayConfig = errorConfig,
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.CONTINUE'),
        showNext: true,
        canGoNext: canDismiss,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            onDismiss();
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
        />
    );
};
