import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
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
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    PasswordRequirement,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    SPECIAL_CHAR_REGEX,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { useHistory } from 'react-router-dom';
import { CheckCircle } from '@material-ui/icons';
import { useQueryString } from '../hooks/useQueryString';
import { SecureTextField } from '../components/SecureTextField';
import { PasswordRequirements } from '../components/password/PasswordRequirements';
import { EmptyState } from '@pxblue/react-components';
import { useRoutes } from '../contexts/RoutingContext';

const useStyles = makeStyles(() =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

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
    const [passwordInput, setPasswordInput] = React.useState('');
    const [confirmInput, setConfirmInput] = React.useState('');

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;

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

    // React.useEffect(() => {
    //     props.onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [passwordInput, confirmInput, areValidMatchingPasswords]); // ignore props

    const defaultRequirements: PasswordRequirement[] = [
        {
            regex: LENGTH_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('PASSWORD_REQUIREMENTS.SPECIAL'),
        },
    ];
    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

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
            ),
        [setPasswordTransitSuccess, t, classes, passwordInput, setPasswordInput, theme, confirmInput, setConfirmInput]
    );

    return (
        <BrandedCardContainer>
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
                    <Button
                        variant="contained"
                        disabled={!canContinue()}
                        color="primary"
                        onClick={onContinue}
                        style={{ width: 100 }}
                    >
                        {setPasswordTransitSuccess ? t('ACTIONS.DONE') : t('ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
