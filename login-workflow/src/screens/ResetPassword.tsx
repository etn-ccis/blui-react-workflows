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
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { BrandedCardContainer, SimpleDialog, FinishState, ChangePasswordForm } from '../components';
import { defaultPasswordRequirements } from '../constants';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import clsx from 'clsx';
import { sharedDialogStyles } from '../styles';
const useDialogStyles = makeStyles(sharedDialogStyles);

/**
 * Renders a screen stack which handles the reset password flow (deep link from email).
 *
 * @category Component
 */
export const ResetPassword: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const { routes } = useRoutes();
    const theme = useTheme();
    const classes = useDialogStyles();
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
            history.push(routes.LOGIN);
        } else {
            resetPassword(passwordInput);
        }
    }, [resetPassword, setPasswordTransitSuccess, passwordInput, history, routes]);

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
                className={classes.dialogTitle}
            />
            <CardContent className={classes.dialogContent}>{getBody()}</CardContent>
            <Divider />
            <CardActions className={classes.dialogActions}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    {!setPasswordTransitSuccess && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={(): void => history.push(routes.LOGIN)}
                            className={classes.dialogButton}
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
                            className={clsx(classes.dialogButton, { [classes.fullWidth]: setPasswordTransitSuccess })}
                        >
                            {setPasswordTransitSuccess ? t('blui:ACTIONS.DONE') : t('blui:ACTIONS.OKAY')}
                        </Button>
                    )}
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
