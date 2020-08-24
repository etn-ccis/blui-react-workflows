import React, { useEffect, ChangeEvent, useCallback } from 'react';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    EMAIL_REGEX,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { BrandedCardContainer, SimpleDialog, FinishState } from '../components';
import {
    CardHeader,
    Typography,
    CardContent,
    Divider,
    CardActions,
    Grid,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

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
            title={t('MESSAGES.ERROR')}
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
                title={t('MESSAGES.EMAIL_SENT')}
                description={
                    <Trans i18nKey={'FORGOT_PASSWORD.LINK_SENT_ALT'} values={{ email: emailInput }}>
                        Link has been sent to <b>{emailInput}</b>.
                    </Trans>
                }
            />
        );
    } else {
        body = (
            <>
                <Typography>
                    <Trans i18nKey={'FORGOT_PASSWORD.INSTRUCTIONS_ALT'} values={{ phone: contactPhone }}>
                        Please enter your email, we will respond in <b>one business day</b>. For urgent issues please
                        call{' '}
                        <a href={`tel:${contactPhone}`} className={classes.link}>
                            {contactPhone}
                        </a>
                        .
                    </Trans>
                </Typography>

                <Divider style={{ margin: `${theme.spacing(4)}px 0px` }} />

                <TextField
                    label={t('LABELS.EMAIL')}
                    fullWidth
                    value={emailInput}
                    onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                    variant="filled"
                    error={hasTransitError}
                    helperText={hasTransitError ? t('FORGOT_PASSWORD.ERROR') : ''}
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
                        {t('HEADER.FORGOT_PASSWORD')}
                    </Typography>
                }
            />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto' }}>{body}</CardContent>
            <Divider />
            <CardActions style={{ padding: theme.spacing(2) }}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={accountUIState.forgotPassword.transitSuccess}
                        onClick={(): void => history.goBack()}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!canContinue()}
                        color="primary"
                        onClick={onContinue}
                        style={{ width: 100 }}
                    >
                        {accountUIState.forgotPassword.transitSuccess ? t('ACTIONS.DONE') : t('ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
