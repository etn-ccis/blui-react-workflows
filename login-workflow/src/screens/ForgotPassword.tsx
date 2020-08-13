import React, { useEffect, ChangeEvent, useCallback } from 'react';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
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
} from '@material-ui/core';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    EMAIL_REGEX,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { EmptyState } from '@pxblue/react-components';
import { useHistory } from 'react-router-dom';
import { CheckCircle } from '@material-ui/icons';
import { Trans } from 'react-i18next';

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
        description: {
            color: 'inherit',
        },
    })
);

export const ForgotPassword: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const classes = useStyles();
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

    // Conditional Elements
    const spinner = isInTransit ? <h1>Spinner</h1> /*</h1><Spinner />*/ : <></>;

    const errorDialog = (
        // <SimpleDialog
        //     title={'Error'}
        //     bodyText={t(transitErrorMessage ?? '')}
        //     visible={hasTransitError && !hasAcknowledgedError}
        //     onDismiss={(): void => {
        //         setHasAcknowledgedError(true);
        //     }}
        // />
        <h1>Error Dialog</h1>
    );

    let body: JSX.Element;
    if (accountUIState.forgotPassword.transitSuccess) {
        body = (
            <div
                style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}
                data-testid="forgot-password-confirmation-content"
            >
                <EmptyState
                    icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                    title={t('MESSAGES.EMAIL_SENT')}
                    description={
                        <Trans i18nKey={'FORGOT_PASSWORD.LINK_SENT_ALT'} values={{ email: emailInput }}>
                            Link has been sent to <b>{emailInput}</b>.
                        </Trans>
                    }
                    classes={{
                        description: classes.description,
                    }}
                />
            </div>
        );
    } else {
        body = (
            <div data-testid="forgot-password-entry-content">
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

                <Divider style={{ margin: '32px 0' }} />

                <TextField
                    label={t('LABELS.EMAIL')}
                    fullWidth
                    id="email"
                    value={emailInput}
                    onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                    variant="filled"
                    error={hasTransitError}
                    helperText={hasTransitError ? t('FORGOT_PASSWORD.ERROR') : ''}
                />
            </div>
        );
    }

    return (
        <BrandedCardContainer>
            <CardHeader
                data-testid="title"
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {t('HEADER.FORGOT_PASSWORD')}
                    </Typography>
                }
            />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto' }}>{body}</CardContent>
            <Divider />
            <CardActions style={{ padding: 16 }}>
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
