import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { SuccessScreenBase, SuccessScreenProps } from '..';
import { useRegistrationWorkflowContext, useRegistrationContext } from '../../contexts';

export const RegistrationSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const { navigate, routeConfig, actions } = useRegistrationContext();
    const { t } = useTranslation();

    const {
        screenData: {
            AccountDetails: { firstName, lastName },
            VerifyCode: { code },
            CreateAccount: { emailAddress },
        },
    } = useRegistrationWorkflowContext();

    useEffect(() => {
        actions()
            .completeRegistration({ firstName, lastName }, code, emailAddress)
            .then((res: { email: string; organizationName: string }) => {
                setEmail(res.email);
                setOrganization(res.organizationName);
            })
            .catch(() => {
                console.error('error fetching registration data');
            });
    }, [actions, code, emailAddress, firstName, lastName]);

    const {
        icon = <CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = `${t('bluiCommon:MESSAGES.WELCOME')}, ${firstName} ${lastName}!`,
        message = (
            <Typography variant="subtitle2">
                <Trans i18nKey={'bluiRegistration:REGISTRATION.SUCCESS_MESSAGE_ALT'} values={{ email, organization }}>
                    Your account has successfully been created with the email <b>{email}</b> belonging to the
                    <b>{` ${organization}`}</b> org.
                </Trans>
            </Typography>
        ),
        onDismiss = (): void => navigate(routeConfig.LOGIN),
        canDismiss = true,
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiRegistration:REGISTRATION.STEPS.COMPLETE'),
        },
        WorkflowCardActionsProps: workflowCardActionsProps = {
            nextLabel: t('bluiCommon:ACTIONS.CONTINUE'),
            showNext: true,
            canGoNext: canDismiss,
            onNext: onDismiss,
            fullWidthButton: true,
        },
    } = props;

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />
    );
};