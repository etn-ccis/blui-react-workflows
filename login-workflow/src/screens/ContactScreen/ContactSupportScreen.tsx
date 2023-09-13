import React from 'react';
import { ChatBubbleOutline } from '@mui/icons-material';
import { ContactSupportScreenBase } from './ContactSupportScreenBase';
import { ContactSupportScreenProps } from './types';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param icon the icon to display in the header
 * @param emailSupportTitle text to display as the contact support title
 * @param emailSupportContent content to display as the contact support content
 * @param phoneSupportTitle text to display as the phone support title
 * @param phoneSupportContent content to display as the phone support content
 * @param contactEmail to display the contact email
 * @param contactPhone to display contact phone number
 * @param dismissButtonLabel to display label for the button
 * @param onDismiss function to call when user clicks button
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 *
 * @category Component
 */

export const ContactSupportScreen: React.FC<ContactSupportScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { navigate, routeConfig } = useAuthContext();

    const {
        icon = <ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />,
        emailSupportTitle = t('bluiAuth:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        emailSupportContent,
        phoneSupportTitle = t('bluiAuth:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        phoneSupportContent,
        contactEmail = 'something@email.com',
        contactPhone = '1-800-123-4567',
        dismissButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        onDismiss,
        WorkflowCardBaseProps,
        WorkflowCardInstructionProps,
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        ...otherContactSupportProps
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiAuth:USER_MENU.CONTACT_US'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        nextLabel: t('bluiCommon:ACTIONS.OKAY'),
        showNext: true,
        canGoNext: true,
        fullWidthButton: true,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            navigate(routeConfig.LOGIN);
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <ContactSupportScreenBase
            WorkflowCardBaseProps={WorkflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={WorkflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            icon={icon}
            emailSupportTitle={emailSupportTitle}
            emailSupportContent={emailSupportContent}
            phoneSupportTitle={phoneSupportTitle}
            phoneSupportContent={phoneSupportContent}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            dismissButtonLabel={dismissButtonLabel}
            onDismiss={onDismiss}
            {...otherContactSupportProps}
        />
    );
};
