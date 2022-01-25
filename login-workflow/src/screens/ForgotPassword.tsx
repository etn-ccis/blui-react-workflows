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
import { useHistory } from 'react-router-dom';
import { BrandedCardContainer, SimpleDialog, FinishState } from '../components';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { useDialogStyles } from '../styles';
import clsx from 'clsx';

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
export const ForgotPassword: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
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
            history.goBack();
        } else {
            resetPassword(emailInput);
        }
    }, [accountUIState, resetPassword, history, emailInput]);

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
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    {!finished && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(): void => history.goBack()}
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
