import React from 'react';
import { Person } from '@mui/icons-material';
import { useRegistrationContext } from '../../contexts';
import { SuccessScreenBase, SuccessScreenProps } from '../SuccessScreen';
import { useTranslation } from 'react-i18next';

/**
 * Full Screen component that renders a Success Screen for the accounts which are already exists in the records
 *
 * @param {SuccessScreenProps} props - props of SuccessScreen
 *
 * @category Component
 */

export const ExistingAccountSuccessScreen: React.FC<SuccessScreenProps> = (props) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useRegistrationContext();

    const {
        canDismiss = true,
        onDismiss = (): void => navigate(routeConfig.LOGIN as string),
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        EmptyStateProps,
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

    const emptyStateProps = {
        icon: <Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        title: t('bluiCommon:MESSAGES.WELCOME'),
        description: t('bluiRegistration:REGISTRATION.SUCCESS_EXISTING'),
        ...EmptyStateProps,
    };

    return (
        <SuccessScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            EmptyStateProps={emptyStateProps}
            {...otherExistingAccountSuccessScreenProps}
        />
    );
};
