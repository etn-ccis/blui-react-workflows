import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
// Constants
import { defaultPasswordRequirements } from '../constants';

// Hooks
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { useQueryString } from '../hooks/useQueryString';
import { useRoutes } from '../contexts/RoutingContext';
import { useHistory } from 'react-router-dom';

// Components
import { BrandedCardContainer, SecureTextField, PasswordRequirements, SimpleDialog } from '../components';
import {
    CardHeader,
    Typography,
    CardContent,
    Divider,
    CardActions,
    Grid,
    Button,
    makeStyles,
    createStyles,
    useTheme,
} from '@material-ui/core';
import { EmptyState } from '@pxblue/react-components';

// Styles
import { CheckCircle, Error } from '@material-ui/icons';

const useStyles = makeStyles(() =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

/**
 * Renders a screen stack which handles the reset password flow (deep link from email).
 *
 * @category Component
 */
export const ResetPassword: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const { routes } = useRoutes();
    const classes = useStyles();
    const theme = useTheme();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const { code, email } = useQueryString();

    // Local State
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;
    const setPasswordIsInTransit = setPasswordTransit.transitInProgress;
    const setPasswordHasTransitError = setPasswordTransit.transitErrorMessage !== null;
    const setPasswordTransitErrorMessage = setPasswordTransit.transitErrorMessage;

    // Network state (verifyResetCode)
    const verifyResetCodeTransit = accountUIState.setPassword.verifyResetCodeTransit;
    const verifyIsInTransit = verifyResetCodeTransit.transitInProgress;
    const validationTransitErrorMessage = verifyResetCodeTransit.transitErrorMessage;
    const verifySuccess = verifyResetCodeTransit.transitSuccess;
    const verifyComplete = verifyResetCodeTransit.transitComplete;

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
                    <div
                        style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}
                        data-testid="reset-password-confirmation-content"
                    >
                        <EmptyState
                            icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: 16 }} />}
                            title={t('PASSWORD_RESET.SUCCESS_MESSAGE')}
                            description={t('CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                            classes={{
                                description: classes.description,
                            }}
                        />
                    </div>
                ) : (
                    <>
                        <Typography>{t('CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>

                        <Divider style={{ margin: '32px 0' }} />

                        <SecureTextField
                            id="password"
                            name="password"
                            label={t('FORMS.PASSWORD')}
                            // className={classes.formFields}
                            value={passwordInput}
                            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                            // error={hasTransitError}
                            // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
                        />
                        <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
                        <SecureTextField
                            id="confirm"
                            name="confirm"
                            label={t('FORMS.CONFIRM_PASSWORD')}
                            // className={classes.formFields}
                            style={{ marginTop: theme.spacing(2) }}
                            value={confirmInput}
                            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setConfirmInput(evt.target.value)}
                            // error={hasTransitError}
                            // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
                        />
                    </>
                )
            ) : !verifyComplete ? (
                <></>
            ) : (
                <div style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}>
                    <EmptyState
                        icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: 16 }} />}
                        title={t('MESSAGES.FAILURE')}
                        description={validationTransitErrorMessage}
                        classes={{
                            description: classes.description,
                        }}
                    />
                </div>
            ),
        [
            t,
            theme,
            classes,
            passwordInput,
            setPasswordInput,
            confirmInput,
            setConfirmInput,
            verifySuccess,
            verifyIsInTransit,
            verifyComplete,
            validationTransitErrorMessage,
            setPasswordTransitSuccess,
        ]
    );

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
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
                data-testid="title"
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {t('FORMS.RESET_PASSWORD')}
                    </Typography>
                }
            />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto' }}>{getBody()}</CardContent>
            <Divider />
            <CardActions style={{ padding: 16 }}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={setPasswordTransitSuccess}
                        onClick={(): void => history.push(routes.LOGIN)}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                    {verifySuccess && (
                        <Button
                            variant="contained"
                            disabled={!canContinue()}
                            color="primary"
                            onClick={onContinue}
                            style={{ width: 100 }}
                        >
                            {setPasswordTransitSuccess ? t('ACTIONS.DONE') : t('ACTIONS.OKAY')}
                        </Button>
                    )}
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
