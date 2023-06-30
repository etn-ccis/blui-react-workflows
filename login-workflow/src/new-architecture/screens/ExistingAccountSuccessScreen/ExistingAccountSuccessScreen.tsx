import React from 'react';
import { Person } from '@mui/icons-material';
import { useRegistrationContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';

/**
 * Full Screen component that renders a Success Screen for the accounts which are already exists in the records
 *
 * @param icon Optional prop to pass in the Icon JSX element for the message
 * @param messageTitle Optional title prop to pass the Title for the message
 * @param message Optional message prop to pass the description
 * @param dismissButtonLabel Optional label for the Continue button
 * @param canDismiss Optional boolean flag prop to dismiss the success screen or not
 * @param onDismiss Callback function that fire when the Continue button clicked
 *
 * @category Full Screen
 */

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
