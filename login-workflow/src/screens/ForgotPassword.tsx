import React, { useEffect, ChangeEvent, useCallback } from 'react';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    EMAIL_REGEX,
    useInjectedUIContext,
} from '@brightlayer-ui/react-auth-shared';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BrandedCardContainer, SimpleDialog, FinishState } from '../components';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Theme, useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import CheckCircle from '@mui/icons-material/CheckCircle';
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
 * Renders the screen for Forgot Password where a user enters their
 * email to receive a reset link.
 *
 * @category Component
 */
export const ForgotPassword: React.FC<React.PropsWithChildren<unknown>> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const classes = useStyles();
    const sharedClasses = useDialogStyles();
    const theme = useTheme();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const { contactPhone } = useInjectedUIContext();

    // Local state
    const [emailInput, setEmailInput] = React.useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);

    // Network state (forgotPassword)
    const forgotPasswordTransit = accountUIState.forgotPassword;
    const isInTransit = forgotPasswordTransit.transitInProgress;
    const hasTransitError = forgotPasswordTransit.transitErrorMessage !== null;
    const transitErrorMessage = forgotPasswordTransit.transitErrorMessage;
    const finished = accountUIState.forgotPassword.transitSuccess;

    const resetPassword = useCallback(
        (email: string): void => {
            setHasAcknowledgedError(false);
            void accountUIActions.actions.forgotPassword(email);
        },
        [setHasAcknowledgedError, accountUIActions]
    );

    const canContinue = useCallback(
        (): boolean => EMAIL_REGEX.test(emailInput) && !accountUIState.forgotPassword.transitInProgress,
        [emailInput, accountUIState]
    );

    const onContinue = useCallback((): void => {
        if (accountUIState.forgotPassword.transitSuccess) {
            navigate(-1);
        } else {
            resetPassword(emailInput);
        }
    }, [accountUIState, resetPassword, navigate, emailInput]);

    // Reset state on dismissal
    useEffect(
        () => (): void => {
            accountUIActions.dispatch(AccountActions.resetPasswordReset());
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // Dynamic Elements
    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            body={t(transitErrorMessage ?? '')}
            open={hasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    let body: JSX.Element;
    if (accountUIState.forgotPassword.transitSuccess) {
        body = (
            <FinishState
                icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                title={t('blui:MESSAGES.EMAIL_SENT')}
                description={
                    <Trans i18nKey={'blui:FORGOT_PASSWORD.LINK_SENT_ALT'} values={{ email: emailInput }}>
                        Link has been sent to <b>{emailInput}</b>.
                    </Trans>
                }
            />
        );
    } else {
        body = (
            <>
                <Typography>
                    <Trans i18nKey={'blui:FORGOT_PASSWORD.INSTRUCTIONS_ALT'} values={{ phone: contactPhone }}>
                        Please enter your email, we will respond in <b>one business day</b>. For urgent issues please
                        call{' '}
                        <a href={`tel:${contactPhone}`} className={classes.link}>
                            {contactPhone}
                        </a>
                        .
                    </Trans>
                </Typography>

                <Divider className={sharedClasses.fullDivider} />

                <TextField
                    id="email"
                    label={t('blui:LABELS.EMAIL')}
                    fullWidth
                    value={emailInput}
                    onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                    onKeyPress={(e): void => {
                        if (e.key === 'Enter' && canContinue()) onContinue();
                    }}
                    variant="filled"
                    error={hasTransitError}
                    helperText={hasTransitError ? t('blui:FORGOT_PASSWORD.ERROR') : ''}
                />
            </>
        );
    }

    return (
        <BrandedCardContainer loading={isInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {t('blui:HEADER.FORGOT_PASSWORD')}
                    </Typography>
                }
                className={sharedClasses.dialogTitle}
            />
            <CardContent className={sharedClasses.dialogContent}>{body}</CardContent>
            <Divider />
            <CardActions className={sharedClasses.dialogActions}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ width: '100%' }}
                >
                    {!finished && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(): void => navigate(-1)}
                            className={sharedClasses.dialogButton}
                        >
                            {t('blui:ACTIONS.BACK')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        disableElevation
                        disabled={!canContinue()}
                        color="primary"
                        onClick={onContinue}
                        className={clsx(sharedClasses.dialogButton, { [sharedClasses.fullWidth]: finished })}
                    >
                        {accountUIState.forgotPassword.transitSuccess ? t('blui:ACTIONS.DONE') : t('blui:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
