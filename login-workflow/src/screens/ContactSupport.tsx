import React from 'react';
import { useLanguageLocale, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { BrandedCardContainer } from '../components';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import clsx from 'clsx';
import { sharedDialogStyles } from '../styles';
const useDialogStyles = makeStyles(sharedDialogStyles);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            fontWeight: 600,
            color: theme.palette.primary.main,
            textTransform: 'none',
            textDecoration: 'none',
            '&:visited': {
                color: theme.palette.primary.main,
            },
        },
    })
);

/**
 * Content for the Contact Us screen. This is exported separately
 * in the event that a user wishes to build another area in their
 * main application where users can view this information.
 *
 * @category Component
 */
export const ContactSupportContent: React.FC = () => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const classes = useStyles();
    const { contactPhone, contactEmail } = useInjectedUIContext();

    return (
        <>
            <div style={{ fontSize: 70, marginBottom: theme.spacing(4), textAlign: 'center' }}>
                <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />
            </div>
            <Typography variant={'body1'} style={{ marginBottom: theme.spacing(1) }}>
                {t('blui:CONTACT_SUPPORT.GENERAL_QUESTIONS')}
            </Typography>
            <Typography>
                {t('blui:CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                <a href={`mailto:${contactEmail}`} className={classes.link}>
                    {contactEmail}
                </a>
                .
            </Typography>
            <Typography variant={'body1'} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(1) }}>
                {t('blui:CONTACT_SUPPORT.EMERGENCY_SUPPORT')}
            </Typography>
            <Typography>
                {t('blui:CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}
                <a href={`tel:${contactPhone}`} className={classes.link}>
                    {contactPhone}
                </a>
                .
            </Typography>
        </>
    );
};

/**
 * Container that renders a screen with contact information for
 * support with the application. Contact information is pulled
 * from the context passed into the workflow.
 *
 * @category Component
 */
export const ContactSupport: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const classes = useDialogStyles();

    return (
        <BrandedCardContainer>
            <CardHeader
                title={<Typography variant={'h6'}>{t('blui:USER_MENU.CONTACT_US')}</Typography>}
                className={classes.dialogTitle}
            />
            <CardContent className={classes.dialogContent}>
                <ContactSupportContent />
            </CardContent>
            <Divider />
            <CardActions className={classes.dialogActions}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={clsx(classes.dialogButton, { [classes.fullWidth]: true })}
                    onClick={(): void => history.goBack()}
                >
                    {t('blui:ACTIONS.OKAY')}
                </Button>
            </CardActions>
        </BrandedCardContainer>
    );
};
