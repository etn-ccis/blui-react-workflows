import { Person } from '@mui/icons-material';
import React from 'react';
import { useRegistrationContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase } from './SuccessScreenBase';
import { SuccessScreenProps } from './types';

export const ExistingAccountSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { navigate, routeConfig } = useRegistrationContext();

    const {
        icon = <Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = t('bluiCommon:MESSAGES.WELCOME'),
        message = t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN),
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
