import React, { useEffect, ChangeEvent, useCallback } from 'react';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    EMAIL_REGEX,
    useInjectedUIContext,
} from '../auth-shared';
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
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import CheckCircle from '@mui/icons-material/CheckCircle';
import {
    DialogButtonStyles,
    DialogActionsStyles,
    DialogContentStyles,
    DialogTitleStyles,
    FullDividerStyles,
} from '../styles';
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
 * Renders the screen for Forgot Password where a user enters their
 * email to receive a reset link.
 *
 * @category Component
 */
export const ForgotPassword: React.FC<React.PropsWithChildren<React.PropsWithChildren>> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
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
                icon={<CheckCircle color={'primary'} sx={{ fontSize: 100, mb: 2 }} />}
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
                        <Box component="a" href={`tel:${contactPhone}`} sx={LinkStyles(theme)}>
                            {contactPhone}
                        </Box>
                        .
                    </Trans>
                </Typography>

                <Divider sx={FullDividerStyles(theme)} />

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
                    <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                        {t('blui:HEADER.FORGOT_PASSWORD')}
                    </Typography>
                }
                sx={DialogTitleStyles(theme)}
            />
            <CardContent sx={DialogContentStyles(theme)}>{body}</CardContent>
            <Divider />
            <CardActions sx={DialogActionsStyles(theme)}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    {!finished && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(): void => navigate(-1)}
                            sx={DialogButtonStyles()}
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
                        sx={DialogButtonStyles(finished)}
                    >
                        {accountUIState.forgotPassword.transitSuccess ? t('blui:ACTIONS.DONE') : t('blui:ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
