import React from 'react';
import { ChatBubbleOutline } from '@mui/icons-material';
import { ContactSupportScreenBase } from './ContactSupportScreenBase';
import { ContactSupportScreenProps } from './types';
import { useAuthContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { LinkStyles } from '../../styles';
import { Typography } from '@mui/material';

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param {ContactSupportScreenProps} props - props of ContactSupportScreen
 *
 * @category Component
 */

export const ContactSupportScreen: React.FC<ContactSupportScreenProps> = (props) => {
    const { t } = useTranslation();
    const { navigate, routeConfig } = useAuthContext();

    const { contactEmail = 'something@email.com', contactPhone = '1-800-123-4567' } = props;

    const defaultEmailSupportContent = (): JSX.Element => (
        <Typography variant="body1">
            {`${t('bluiAuth:CONTACT_SUPPORT.SUPPORT_MESSAGE')}`}
            <Typography
                variant="button"
                sx={{ ...LinkStyles, fontSize: 'inherit' }}
                component="a"
                href={`mailto:${contactEmail ?? ''}`}
            >
                {contactEmail}
            </Typography>
            {`.`}
        </Typography>
    );

    const defaultPhoneSupportContent = (): JSX.Element => (
        <Typography variant="body1">
            {`${t('bluiAuth:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}`}
            <Typography
                variant="button"
                sx={{ ...LinkStyles, fontSize: 'inherit' }}
                component="a"
                href={`tel:${contactPhone ?? ''}`}
            >
                {contactPhone}
            </Typography>
            {`.`}
        </Typography>
    );

    const {
        icon = <ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />,
        emailSupportTitle = t('bluiAuth:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        emailSupportContent = defaultEmailSupportContent,
        phoneSupportTitle = t('bluiAuth:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        phoneSupportContent = defaultPhoneSupportContent,
        dismissButtonLabel = t('bluiCommon:ACTIONS.OKAY'),
        onDismiss,
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
            navigate(routeConfig.LOGIN as string);
            WorkflowCardActionsProps?.onNext?.();
        },
    };

    return (
        <ContactSupportScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
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
