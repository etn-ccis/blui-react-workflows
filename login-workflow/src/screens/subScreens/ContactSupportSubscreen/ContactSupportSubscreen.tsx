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
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../../../styles';
import {
    ContactSupportSubscreenClassKey,
    getContactSupportSubscreenUtilityClass,
    ContactSupportSubscreenClasses,
} from './ContactSupportSubscreenClasses';
import { useInjectedUIContext, useLanguageLocale } from '../../../auth-shared';

const LinkStyles = {
    fontWeight: 600,
    color: 'primary.main',
    textTransform: 'none',
    textDecoration: 'none',
    '&:visited': {
        color: 'primary.main',
    },
};

export type ContactSupportSubscreenHiddenElements = {
    title?: boolean;
    contactSupportSubscreenContent?: boolean;
    contactSupportSubscreenIcon?: boolean;
    contactSupportSubscreenQuestion?: boolean;
    contactSupportSubscreenMessage?: boolean;
    contactSupportSubscreenEmergency?: boolean;
    contactSupportSubscreenTechnicalAssistance?: boolean;
    actions?: boolean;
};

export type ContactSupportSubscreenProps = {
    title?: string;
    TitleProps?: TypographyProps;
    Actions?: JSX.Element | JSX.Element[];
    divider?: boolean;
    ContactSupportSubscreenContent?: JSX.Element;
    CardHeaderProps?: CardHeaderPropsType;
    CardContentProps?: CardContentPropsType;
    CardActionsProps?: CardActionsPropsType;
    phoneNumber?: string;
    emailId?: string;
    contactSupportSubscreenQuestion?: string;
    contactSupportSubscreenMessage?: string;
    contactSupportSubscreenEmergency?: string;
    contactSupportSubscreenTechnicalAssistance?: string;
    ContactSupportSubscreenIcon?: ReactNode;
    hiddenElements?: ContactSupportSubscreenHiddenElements;
    classes?: ContactSupportSubscreenClasses;
    slots?: { cardHeader?: React.ElementType; cardContent?: React.ElementType };
    slotProps?: {
        cardHeader?: CardHeaderPropsType;
        cardContent?: CardContentPropsType;
    };
};

const useUtilityClasses = (
    ownerState: ContactSupportSubscreenProps
): Record<ContactSupportSubscreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        cardHeader: ['cardHeader'],
        cardContent: ['cardContent'],
        cardActions: ['cardActions'],
    };

    return composeClasses(slots, getContactSupportSubscreenUtilityClass, classes);
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
 * @param ContactSupportSubscreenContent to display the contact support content
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
 * @param contactSupportSubscreenQuestion to override contact support question
 *
 * @param contactSupportSubscreenMessage to override contact support message
 *
 * @param contactSupportSubscreenEmergency to override contact support emergency support
 *
 * @param contactSupportSubscreenTechnicalAssistance to override contact support technical assistance
 *
 * @param ContactSupportSubscreenIcon to render the icon
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

export const ContactSupportSubscreen: React.FC<ContactSupportSubscreenProps> = (props) => {
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
        ContactSupportSubscreenContent,
        CardHeaderProps,
        CardContentProps,
        CardActionsProps,
        phoneNumber = contactPhone,
        emailId = contactEmail,
        contactSupportSubscreenQuestion = t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS'),
        contactSupportSubscreenMessage = t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE'),
        contactSupportSubscreenEmergency = t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT'),
        contactSupportSubscreenTechnicalAssistance = t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE'),
        ContactSupportSubscreenIcon = <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />,
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
            {!hiddenElements.contactSupportSubscreenContent && (
                <CardContent
                    sx={DialogContentStyles(theme)}
                    className={cx(defaultClasses.cardContent, classes.cardContent)}
                    component={slots.cardContent}
                    {...CardContentProps}
                    {...slotProps.cardContent}
                >
                    {ContactSupportSubscreenContent ? (
                        ContactSupportSubscreenContent
                    ) : (
                        <>
                            {!hiddenElements.contactSupportSubscreenIcon && (
                                <Box sx={{ fontSize: 70, mb: 4, textAlign: 'center' }}>
                                    {ContactSupportSubscreenIcon}
                                </Box>
                            )}
                            {!hiddenElements.contactSupportSubscreenQuestion && (
                                <Typography variant={'body1'} sx={{ mb: 1 }}>
                                    {contactSupportSubscreenQuestion}
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportSubscreenMessage && (
                                <Typography>
                                    {contactSupportSubscreenMessage}
                                    <Box component="a" href={`mailto:${emailId}`} sx={LinkStyles}>
                                        {emailId}
                                    </Box>
                                    .
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportSubscreenEmergency && (
                                <Typography variant={'body1'} sx={{ mt: 4, mb: 1 }}>
                                    {contactSupportSubscreenEmergency}
                                </Typography>
                            )}
                            {!hiddenElements.contactSupportSubscreenTechnicalAssistance && (
                                <Typography>
                                    {contactSupportSubscreenTechnicalAssistance}
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
