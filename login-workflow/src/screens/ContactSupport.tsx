import React from 'react';
import { ChatBubbleOutline } from '@material-ui/icons';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import {
    CardContent,
    Button,
    CardActions,
    useTheme,
    Typography,
    makeStyles,
    Theme,
    createStyles,
    CardHeader,
} from '@material-ui/core';
import { useLanguageLocale, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { useHistory } from 'react-router-dom';

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

export const ContactSupport: React.FC = () => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyles();
    const { contactPhone, contactEmail } = useInjectedUIContext();

    return (
        <BrandedCardContainer>
            <CardHeader title={<Typography variant={'h6'}>{t('USER_MENU.CONTACT_US')}</Typography>} />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto' }}>
                <div style={{ fontSize: 70, marginBottom: theme.spacing(4), textAlign: 'center' }}>
                    <ChatBubbleOutline fontSize={'inherit'} color={'primary'} />
                </div>
                <Typography variant={'h6'}>{t('CONTACT_SUPPORT.GENERAL_QUESTIONS')}</Typography>
                <Typography>
                    {t('CONTACT_SUPPORT.SUPPORT_MESSAGE')}
                    <a href={`mailto:${contactEmail}`} className={classes.link}>
                        {contactEmail}
                    </a>
                    .
                </Typography>
                <Typography variant={'h6'} style={{ marginTop: theme.spacing(4) }}>
                    {t('CONTACT_SUPPORT.EMERGENCY_SUPPORT')}
                </Typography>
                <Typography>
                    {t('CONTACT_SUPPORT.TECHNICAL_ASSISTANCE')}
                    <a href={`tel:${contactPhone}`} className={classes.link}>
                        {contactPhone}
                    </a>
                    .
                </Typography>
            </CardContent>
            <CardActions style={{ padding: 16, justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(): void => history.goBack()}
                    style={{ width: 100 }}
                >
                    {t('ACTIONS.OKAY')}
                </Button>
            </CardActions>
        </BrandedCardContainer>
    );
};
