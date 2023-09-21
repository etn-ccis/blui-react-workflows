import React from 'react';
import { Person } from '@mui/icons-material';
import { useRegistrationContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';

/**
 * Full Screen component that renders a Success Screen for the accounts which are already exists in the records
 *
 * @param icon the icon to be displayed on the screen
 * @param messageTitle title of the success message
 * @param message success message to be displayed on the screen
 * @param dismissButtonLabel to display label for the button
 * @param canDismiss boolean flag prop to dismiss the success screen or not
 * @param onDismiss function to call when the dismiss button is clicked
 *
 * @category Component
 */

export const ExistingAccountSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { navigate, routeConfig } = useRegistrationContext();

    const {
        icon = <Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = t('bluiCommon:MESSAGES.WELCOME'),
        message = t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherExistingAccountSuccessScreenProps
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
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={icon}
            messageTitle={messageTitle}
            message={message}
            {...otherExistingAccountSuccessScreenProps}
        />
    );
};
