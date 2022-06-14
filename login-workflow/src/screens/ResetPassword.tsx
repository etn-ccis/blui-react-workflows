import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    useInjectedUIContext,
} from '@brightlayer-ui/react-auth-shared';
import { useQueryString } from '../hooks/useQueryString';
import { useRoutes } from '../contexts/RoutingContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { BrandedCardContainer, SimpleDialog, FinishState, ChangePasswordForm } from '../components';
import { defaultPasswordRequirements } from '../constants';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import { DialgButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../styles';

/**
 * Renders a screen stack which handles the reset password flow (deep link from email).
 *
 * @category Component
 */
export const ResetPassword: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const { routes } = useRoutes();
    const theme = useTheme();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const { code, email } = useQueryString();

    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    // Local State
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    // Network state (verifyResetCode)
    const verifyResetCodeTransit = accountUIState.setPassword.verifyResetCodeTransit;
    const verifyIsInTransit = verifyResetCodeTransit.transitInProgress;
    const validationTransitErrorMessage = verifyResetCodeTransit.transitErrorMessage;
    const verifySuccess = verifyResetCodeTransit.transitSuccess;
    const verifyComplete = verifyResetCodeTransit.transitComplete;

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;
    const setPasswordIsInTransit = setPasswordTransit.transitInProgress;
    const setPasswordHasTransitError = setPasswordTransit.transitErrorMessage !== null;
    const setPasswordTransitErrorMessage = setPasswordTransit.transitErrorMessage;

    // Reset state on dismissal
    useEffect(
        () => (): void => {
            accountUIActions.dispatch(AccountActions.setPasswordReset());
            accountUIActions.dispatch(AccountActions.verifyResetCodeReset());
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        if (!verifyIsInTransit && !verifyComplete && code.length > 0) {
            void accountUIActions.actions.verifyResetCode(code, email);
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [verifyIsInTransit, code, email, verifyComplete, accountUIActions.actions]);

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const resetPassword = useCallback(
        (password: string): void => {
            void accountUIActions.actions.setPassword(code, password, email);
        },
        [accountUIActions, code, email]
    );

    const canContinue = useCallback(
        (): boolean => areValidMatchingPasswords() && !setPasswordTransit.transitInProgress,
        [areValidMatchingPasswords, setPasswordTransit]
    );
    const onContinue = useCallback(() => {
        if (setPasswordTransitSuccess) {
            navigate(routes.LOGIN);
        } else {
            resetPassword(passwordInput);
        }
    }, [resetPassword, setPasswordTransitSuccess, passwordInput, navigate, routes]);

    const getBody = useCallback(
        () =>
            verifySuccess && !verifyIsInTransit ? (
                setPasswordTransitSuccess ? (
                    <FinishState
                        icon={
                            <CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />
                        }
                        title={t('blui:PASSWORD_RESET.SUCCESS_MESSAGE')}
                        description={t('blui:CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                    />
                ) : (
                    <ChangePasswordForm
                        passwordRef={passwordRef}
                        confirmRef={confirmRef}
                        passwordLabel={t('blui:LABELS.NEW_PASSWORD')}
                        onPasswordChange={updateFields}
                        onSubmit={canContinue() ? onContinue : undefined}
                    />
                )
            ) : !verifyComplete ? (
                <></>
            ) : (
                <FinishState
                    icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                    title={t('blui:MESSAGES.FAILURE')}
                    description={validationTransitErrorMessage}
                />
            ),
        [
            t,
            canContinue,
            onContinue,
            theme,
            verifySuccess,
            verifyIsInTransit,
            verifyComplete,
            validationTransitErrorMessage,
            setPasswordTransitSuccess,
            updateFields,
        ]
    );

    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            body={t(setPasswordTransitErrorMessage ?? '')}
            open={setPasswordHasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    return (
        <BrandedCardContainer loading={verifyIsInTransit || setPasswordIsInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {t('blui:FORMS.RESET_PASSWORD')}
                    </Typography>
                }
                sx={DialogTitleStyles(theme)}
            />
            <CardContent sx={DialogContentStyles(theme)}>{getBody()}</CardContent>
            <Divider />
            <CardActions sx={DialogActionsStyles(theme)}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ width: '100%' }}
                >
                    {!setPasswordTransitSuccess && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(): void => navigate(routes.LOGIN)}
                            sx={DialgButtonStyles()}
                        >
                            {t('blui:ACTIONS.BACK')}
                        </Button>
                    )}
                    {verifySuccess && (
                        <Button
                            variant="contained"
                            disableElevation
                            disabled={!canContinue()}
                            color="primary"
                            onClick={onContinue}
                            sx={DialgButtonStyles(setPasswordTransitSuccess)}
                        >
                            {setPasswordTransitSuccess ? t('blui:ACTIONS.DONE') : t('blui:ACTIONS.OKAY')}
                        </Button>
                    )}
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
