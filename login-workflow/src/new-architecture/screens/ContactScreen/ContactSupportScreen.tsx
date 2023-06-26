import React from 'react';
import { ChatBubbleOutline } from '@mui/icons-material';
import { ContactScreenBase } from './ContactScreenBase';
import { ContactScreenProps } from './types';
import { useLanguageLocale } from '../../hooks';
import { useAuthContext } from '../../contexts';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param title to display in the header
 * @param icon to display in the icon
 * @param description to display the contact support content
 * @param contactEmail to display the contact email
 * @param contactPhone to display contact phone number
 * @param dismissButtonLabel to display label text in button
 * @param onDismiss function to call when user clicks button
 * @param slots used for each slot in `ContactScreen`
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const ContactSupportScreen: React.FC<ContactScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { navigate, routeConfig } = useAuthContext();

    const {
        WorkflowCardHeaderProps: workflowCardHeaderProps = { title: t('bluiAuth:USER_MENU.CONTACT_US') },
        icon = <ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />,
        emailSupportTitle = t('bluiAuth:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        phoneSupportTitle = t('bluiAuth:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        contactEmail = 'something@email.com',
        contactPhone = '1-800-123-4567',
        dismissButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        WorkflowCardActionsProps: workflowCardActionsProps = {
            nextLabel: t('bluiCommon:ACTIONS.OKAY'),
            showNext: true,
            canGoNext: true,
            onNext: (): void => navigate(routeConfig.LOGIN),
            fullWidthButton: true,
        },
    } = props;

    return (
        <ContactScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            icon={icon}
            emailSupportTitle={emailSupportTitle}
            phoneSupportTitle={phoneSupportTitle}
            contactEmail={contactEmail}
            contactPhone={contactPhone}
            dismissButtonLabel={dismissButtonLabel}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />
    );
};
