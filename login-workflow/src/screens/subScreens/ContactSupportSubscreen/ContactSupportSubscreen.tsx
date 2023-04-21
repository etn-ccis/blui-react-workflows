import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CardActions, { CardActionsProps as CardActionsPropsType } from '@mui/material/CardActions';
import CardContent, { CardContentProps as CardContentPropsType } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps as CardHeaderPropsType } from '@mui/material/CardHeader';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import { useLanguageLocale, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../../../styles';
import {
    ContactSupportClassKey,
    getContactSupportUtilityClass,
    ContactSupportClasses,
} from './ContactSupportSubscreenClasses';

const LinkStyles = {
    fontWeight: 600,
    color: 'primary.main',
    textTransform: 'none',
    textDecoration: 'none',
    '&:visited': {
        color: 'primary.main',
    },
};

export type ContactSupportHiddenElements = {
    title?: boolean;
    contactSupportContent?: boolean;
    contactSupportIcon?: boolean;
    contactSupportQuestion?: boolean;
    contactSupportMessage?: boolean;
    contactSupportEmergency?: boolean;
    contactSupportTechnicalAssistance?: boolean;
    actions?: boolean;
};

export type ContactSupportProps = {
    title?: string;
    TitleProps?: TypographyProps;
    Actions?: JSX.Element | JSX.Element[];
    divider?: boolean;
    ContactSupportContent?: JSX.Element;
    CardHeaderProps?: CardHeaderPropsType;
    CardContentProps?: CardContentPropsType;
    CardActionsProps?: CardActionsPropsType;
    phoneNumber?: string;
    emailId?: string;
    contactSupportQuestion?: string;
    contactSupportMessage?: string;
    contactSupportEmergency?: string;
    contactSupportTechnicalAssistance?: string;
    ContactSupportIcon?: ReactNode;
    hiddenElements?: ContactSupportHiddenElements;
    classes?: ContactSupportClasses;
    slots?: { cardHeader?: React.ElementType; cardContent?: React.ElementType };
    slotProps?: {
        cardHeader?: CardHeaderPropsType;
        cardContent?: CardContentPropsType;
    };
};

const useUtilityClasses = (ownerState: ContactSupportProps): Record<ContactSupportClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        cardHeader: ['cardHeader'],
        cardContent: ['cardContent'],
        cardActions: ['cardActions'],
    };

    return composeClasses(slots, getContactSupportUtilityClass, classes);
};

/**
 * Component renders a screen with contact information for support with the application.
 * Contact information is pulled from the context passed into the workflow.
 *
 * @param title to display in the header
 *
 * @param TitleProps Props to pass to title
 *
 * @param Actions to display inside `CardActions`
 *
 * @param divider which appears above `Actions`
 *
 * @param ContactSupportContent to display the contact support content
 *
 * @param CardHeaderProps Props to pass to `CardHeader`
 *
 * @param CardContentProps Props to pass to `CardContent`
 *
 * @param CardActionsProps Props to pass to `CardActions`
 *
 * @param phoneNumber to override contact phone number
 *
 * @param emailId to override contact email id
 *
 * @param contactSupportQuestion to override contact support question
 *
 * @param contactSupportMessage to override contact support message
 *
 * @param contactSupportEmergency to override contact support emergency support
 *
 * @param contactSupportTechnicalAssistance to override contact support technical assistance
 *
 * @param ContactSupportIcon to render the icon
 *
 * @param hiddenElements to hide various elements of the component
 *
 * @param classes for default style overrides
 *
 * @param slots used for each slot in `ContactSupportSubscreen`
 *
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const ContactSupportSubscreen: React.FC<ContactSupportProps> = (props) => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const theme = useTheme();
    const { contactPhone, contactEmail } = useInjectedUIContext();
    const defaultClasses = useUtilityClasses(props);

    const {
        title = t('blui:USER_MENU.CONTACT_US'),
        TitleProps,
        Actions = (
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
        ContactSupportContent,
        CardHeaderProps,
        CardContentProps,
        CardActionsProps,
        phoneNumber = contactPhone,
        emailId = contactEmail,
        contactSupportQuestion = t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        contactSupportMessage = t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE'),
        contactSupportEmergency = t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        contactSupportTechnicalAssistance = t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE'),
        ContactSupportIcon = <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />,
        hiddenElements = {},
        classes = {},
        slots = {},
        slotProps = {},
    } = props;

    return (
        <>
            {!hiddenElements.title && (
                <CardHeader
                    title={
                        <Typography variant={'h6'} {...TitleProps}>
                            {title}
                        </Typography>
                    }
                    sx={DialogTitleStyles(theme)}
                    className={cx(defaultClasses.cardHeader, classes.cardHeader)}
                    component={slots.cardHeader}
                    {...CardHeaderProps}
                    {...slotProps.cardHeader}
                />
            )}
            {!hiddenElements.contactSupportContent && (
                <CardContent
                    sx={DialogContentStyles(theme)}
                    className={cx(defaultClasses.cardContent, classes.cardContent)}
                    component={slots.cardContent}
                    {...CardContentProps}
                    {...slotProps.cardContent}
                >
                    {ContactSupportContent ? (
                        ContactSupportContent
                    ) : (
                        <>
                            {!hiddenElements.contactSupportIcon && (
                                <Box sx={{ fontSize: 70, mb: 4, textAlign: 'center' }}>{ContactSupportIcon}</Box>
                            )}
                            {!hiddenElements.contactSupportQuestion && (
                                <Typography variant={'body1'} sx={{ mb: 1 }}>
                                    {contactSupportQuestion}
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportMessage && (
                                <Typography>
                                    {contactSupportMessage}
                                    <Box component="a" href={`mailto:${emailId}`} sx={LinkStyles}>
                                        {emailId}
                                    </Box>
                                    .
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportEmergency && (
                                <Typography variant={'body1'} sx={{ mt: 4, mb: 1 }}>
                                    {contactSupportEmergency}
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportTechnicalAssistance && (
                                <Typography>
                                    {contactSupportTechnicalAssistance}
                                    <Box component="a" href={`tel:${phoneNumber}`} sx={LinkStyles}>
                                        {phoneNumber}
                                    </Box>
                                    .
                                </Typography>
                            )}
                        </>
                    )}
                </CardContent>
            )}
            {divider && <Divider />}
            {!hiddenElements.actions && (
                <CardActions
                    sx={DialogActionsStyles(theme)}
                    className={cx(defaultClasses.cardActions, classes.cardActions)}
                    {...CardActionsProps}
                >
                    {Actions}
                </CardActions>
            )}
        </>
    );
};
