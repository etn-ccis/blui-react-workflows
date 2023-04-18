import React, { ReactNode } from 'react';
import { useLanguageLocale, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions, { CardActionsProps } from '@mui/material/CardActions';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { BrandedCardContainer } from '../../components';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../../styles';
import Box from '@mui/material/Box';

const LinkStyles = (theme: Theme): SxProps<Theme> => ({
    fontWeight: 600,
    color: theme.palette.primary.main,
    textTransform: 'none',
    textDecoration: 'none',
    '&:visited': {
        color: theme.palette.primary.main,
    },
});

/**
 * Content for the Contact Us screen. This is exported separately
 * in the event that a user wishes to build another area in their
 * main application where users can view this information.
 *
 * @category Component
 */

export type ContactSupportProps = {
    title?: string;
    titleProps?: TypographyProps;
    actions?: JSX.Element | JSX.Element[];
    divider?: boolean;
    contactSupportContent?: JSX.Element;
    cardHeaderProps?: CardHeaderProps;
    cardContentProps?: CardContentProps;
    cardActionsProps?: CardActionsProps;
    phoneNumber?: string;
    emailId?: string;
    contactSupportQuestion?: string;
    contactSupportMessage?: string;
    contactSupportEmergency?: string;
    contactSupportTechnicalAssistance?: string;
    contactSupportIcon?: ReactNode;
    hideTitle?: boolean;
    hideContactSupportContent?: boolean;
    hideContactSupportIcon?: boolean;
    hideContactSupportQuestion?: boolean;
    hideContactSupportMessage?: boolean;
    hideContactSupportEmergency?: boolean;
    hideContactSupportTechnicalAssistance?: boolean;
    hideActions?: boolean;
    showInCard?: boolean;
};

/**
 * Container that renders a screen with contact information for
 * support with the application. Contact information is pulled
 * from the context passed into the workflow.
 *
 * @category Component
 */

export const ContactSupport: React.FC<React.PropsWithChildren<ContactSupportProps>> = (props) => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const theme = useTheme();
    const { contactPhone, contactEmail } = useInjectedUIContext();

    const {
        title = t('blui:USER_MENU.CONTACT_US'),
        titleProps,
        actions = (
            <Button
                variant="contained"
                color="primary"
                disableElevation
                sx={DialogButtonStyles(true)}
                onClick={(): void => navigate(-1)}
            >
                {t('blui:ACTIONS.OKAY')}
            </Button>
        ),
        divider = true,
        contactSupportContent,
        cardHeaderProps,
        cardContentProps,
        cardActionsProps,
        phoneNumber = contactPhone,
        emailId = contactEmail,
        contactSupportQuestion = t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        contactSupportMessage = t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE'),
        contactSupportEmergency = t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        contactSupportTechnicalAssistance = t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE'),
        contactSupportIcon = <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />,
        hideTitle = false,
        hideContactSupportContent = false,
        hideContactSupportIcon = false,
        hideContactSupportQuestion = false,
        hideContactSupportMessage = false,
        hideContactSupportEmergency = false,
        hideContactSupportTechnicalAssistance = false,
        hideActions = false,
    } = props;

    return (
        <BrandedCardContainer>
            {!hideTitle && (
                <CardHeader
                    title={
                        <Typography variant={'h6'} {...titleProps}>
                            {title}
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                    {...cardHeaderProps}
                />
            )}
            {!hideContactSupportContent && (
                <CardContent sx={DialogContentStyles(theme)} {...cardContentProps}>
                    {contactSupportContent ? (
                        contactSupportContent
                    ) : (
                        <>
                            {!hideContactSupportIcon && (
                                <Box sx={{ fontSize: 70, mb: 4, textAlign: 'center' }}>{contactSupportIcon}</Box>
                            )}
                            {!hideContactSupportQuestion && (
                                <Typography variant={'body1'} sx={{ mb: 1 }}>
                                    {contactSupportQuestion}
                                </Typography>
                            )}
                            {!hideContactSupportMessage && (
                                <Typography>
                                    {contactSupportMessage}
                                    <Box component="a" href={`mailto:${emailId}`} sx={LinkStyles(theme)}>
                                        {emailId}
                                    </Box>
                                    .
                                </Typography>
                            )}
                            {!hideContactSupportEmergency && (
                                <Typography variant={'body1'} sx={{ mt: 4, mb: 1 }}>
                                    {contactSupportEmergency}
                                </Typography>
                            )}
                            {!hideContactSupportTechnicalAssistance && (
                                <Typography>
                                    {contactSupportTechnicalAssistance}
                                    <Box component="a" href={`tel:${phoneNumber}`} sx={LinkStyles(theme)}>
                                        {phoneNumber}
                                    </Box>
                                    .
                                </Typography>
                            )}
                        </>
                    )}
                </CardContent>
            )}
            {divider ? <Divider /> : undefined}
            {!hideActions && (
                <CardActions sx={DialogActionsStyles(theme)} {...cardActionsProps}>
                    {actions}
                </CardActions>
            )}
        </BrandedCardContainer>
    );
};
