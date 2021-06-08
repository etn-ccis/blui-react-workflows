import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useRoutes } from '../contexts/RoutingContext';
import {
    useSecurityState,
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
    useInjectedUIContext,
    AccountActions,
    EMAIL_REGEX,
} from '@pxblue/react-auth-shared';
import { Link } from 'react-router-dom';
import {
    useTheme,
    Typography,
    TextField,
    Theme,
    createStyles,
    makeStyles,
    Grid,
    FormControlLabel,
    Checkbox,
    Button,
} from '@material-ui/core';
import { BrandedCardContainer, SimpleDialog, SecureTextField } from '../components';

import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
import cyberBadge from '../assets/images/cybersecurity_certified.png';
import * as Colors from '@pxblue/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emailFormField: {
            marginBottom: theme.spacing(5),
            '&$hasError': {
                marginBottom: theme.spacing(3),
            },
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(4),
            },
        },
        passwordFormField: {
            marginBottom: theme.spacing(3),
        },
        buttonRow: {
            marginBottom: theme.spacing(5),
            flexWrap: 'nowrap',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap',
                flexDirection: 'column',
                justifyContent: 'center',
            },
        },
        cyberBadge: {
            alignSelf: 'center',
            maxWidth: '30%',
        },
        debugButton: {
            position: 'absolute',
            top: theme.spacing(3),
            right: theme.spacing(3),
        },
        debugMessage: {
            backgroundColor: Colors.yellow[500],
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        formContent: {
            padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
            },
        },
        link: {
            fontWeight: 600,
            textTransform: 'none',
            textDecoration: 'none',
            color: theme.palette.primary.main,
            '&:visited': {
                color: 'inherit',
            },
        },
        linksWrapper: {
            textAlign: 'center',
            paddingBottom: theme.spacing(4),
        },
        largeIcon: {
            width: 60,
            height: 60,
            color: theme.palette.text.secondary,
        },
        rememberMeCheckbox: {
            [theme.breakpoints.down('xs')]: {
                marginRight: 0,
            },
        },
        hasError: {},
        productLogo: {
            maxWidth: '100%',
            maxHeight: 80,
        },
    })
);

/**
 * Login screen with loading and error states, as well as "remember me" functionality to store a user's email between logins.
 * Requires being wrapped in an [[AuthNavigationContainer]] for access to global state and actions for authentication and registration.
 * Has a debug mode which shows buttons that allow direct access to the deep link flows (invite registration, set password from forgot password, etc.).
 *
 *
 * @category Component
 */
export const Login: React.FC = () => {
    const securityState = useSecurityState();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();
    const { routes } = useRoutes();
    const theme = useTheme();
    const classes = useStyles();
    const {
        showRememberMe = true,
        allowDebugMode = false,
        showSelfRegistration = true,
        enableResetPassword = true,
        showContactSupport = true,
        showCybersecurityBadge = true,
        projectImage,
        loginFooter,
        loginHeader = (
            <div style={{ marginBottom: theme.spacing(6) }}>
                <img className={classes.productLogo} src={projectImage || stackedEatonLogo} alt="logo" />
            </div>
        ),
        loginType = 'email',
        loginActions,
    } = useInjectedUIContext();

    const passwordField = useRef<any>(null);

    // Local State
    const [rememberPassword, setRememberPassword] = React.useState(
        showRememberMe ? securityState.rememberMeDetails.rememberMe ?? false : false
    );
    const [emailInput, setEmailInput] = React.useState(
        showRememberMe ? securityState.rememberMeDetails.email ?? '' : ''
    );
    const [passwordInput, setPasswordInput] = React.useState('');

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [debugMode, setDebugMode] = React.useState(false);

    const loginTapped = useCallback((): void => {
        setHasAcknowledgedError(false);
        void authUIActions.actions.logIn(emailInput, passwordInput, showRememberMe ? rememberPassword : false);
    }, [setHasAcknowledgedError, authUIActions, emailInput, passwordInput, rememberPassword, showRememberMe]);

    const transitState = authUIState.login;
    const showLinks = showSelfRegistration || enableResetPassword || showContactSupport;

    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('pxb:MESSAGES.REQUEST_ERROR');

    const isInvalidCredentials =
        transitErrorMessage.replace('pxb:', '') === 'LOGIN.INCORRECT_CREDENTIALS' ||
        transitErrorMessage.replace('pxb:', '') === 'LOGIN.INVALID_CREDENTIALS';

    useEffect(
        () => {
            authUIActions.dispatch(AccountActions.resetLogin());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Construct the dynamic elements
    const errorDialog = (
        <SimpleDialog
            title={t('pxb:MESSAGES.ERROR')}
            body={t(transitErrorMessage)}
            open={hasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    const contactEatonRepresentative: JSX.Element = showContactSupport ? (
        <Typography variant="body2" color={'primary'}>
            <Link className={classes.link} to={routes.SUPPORT}>
                {t('pxb:MESSAGES.CONTACT')}
            </Link>
        </Typography>
    ) : (
        <></>
    );

    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration) {
        createAccountOption = (
            <Typography variant="body2" color={'primary'} style={{ marginBottom: theme.spacing(4) }}>
                <Link className={classes.link} to={routes.REGISTER_SELF}>
                    {t('pxb:ACTIONS.CREATE_ACCOUNT')}
                </Link>
            </Typography>
        );
    }

    // Create buttons and links for debug mode
    let debugButton: JSX.Element = <></>;
    if (allowDebugMode) {
        debugButton = (
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={(): void => setDebugMode(!debugMode)}
                className={classes.debugButton}
            >{`DEBUG`}</Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <div className={classes.debugMessage}>
                <Typography variant={'h6'} align={'center'}>
                    DEBUG MODE
                </Typography>
            </div>
        );
    }

    const debugLinks = !debugMode ? null : (
        <div className={classes.linksWrapper}>
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.REGISTER_INVITE}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}>
                    [Test Invite Register]
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link className={classes.link} to={routes.REGISTER_SELF}>
                    [Test Self Register]
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.FORGOT_PASSWORD}`}>
                    [Test Forgot Password]
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.RESET_PASSWORD}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}>
                    [Test Reset Password Email]
                </Link>
            </Typography>
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.SUPPORT}`}>
                    [Test Contact Support]
                </Link>
            </Typography>
        </div>
    );

    return (
        <BrandedCardContainer loading={transitState.transitInProgress}>
            {errorDialog}
            {debugButton}
            <form
                onSubmit={(evt): void => {
                    evt.preventDefault();
                    loginTapped();
                }}
            >
                <div className={classes.formContent}>
                    {loginHeader && typeof loginHeader === 'function' && loginHeader(null)}
                    {loginHeader && typeof loginHeader !== 'function' && loginHeader}

                    {debugMessage}
                    {debugLinks}

                    <TextField
                        label={loginType === 'username' ? t('pxb:LABELS.USERNAME') : t('pxb:LABELS.EMAIL')}
                        id="email"
                        name={loginType === 'username' ? 'username' : 'email'}
                        type={loginType === 'username' ? 'text' : 'email'}
                        className={clsx(classes.emailFormField, { [classes.hasError]: hasTransitError })}
                        value={emailInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                        onKeyPress={(e): void => {
                            if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                        }}
                        variant="filled"
                        error={isInvalidCredentials}
                        helperText={isInvalidCredentials ? t('pxb:LOGIN.INCORRECT_CREDENTIALS') : ''}
                    />
                    <SecureTextField
                        inputRef={passwordField}
                        id="password"
                        name="password"
                        label={t('pxb:LABELS.PASSWORD')}
                        className={clsx(classes.passwordFormField, { [classes.hasError]: hasTransitError })}
                        value={passwordInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                        variant="filled"
                        error={isInvalidCredentials}
                        helperText={isInvalidCredentials ? t('pxb:LOGIN.INCORRECT_CREDENTIALS') : ''}
                    />

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        className={classes.buttonRow}
                    >
                        {showRememberMe && (
                            <FormControlLabel
                                className={classes.rememberMeCheckbox}
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={rememberPassword}
                                        onChange={(evt): void => setRememberPassword(evt.target.checked)}
                                    />
                                }
                                label={t('pxb:ACTIONS.REMEMBER')}
                            />
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation
                            disabled={
                                loginType === 'username'
                                    ? !emailInput || !passwordInput
                                    : !EMAIL_REGEX.test(emailInput) || !passwordInput
                            }
                            color="primary"
                            style={{ width: showRememberMe ? 150 : '100%' }}
                            onClick={loginTapped}
                        >
                            {t('pxb:ACTIONS.LOG_IN')}
                        </Button>
                    </Grid>

                    {loginActions && typeof loginActions === 'function' && loginActions(null)}
                    {loginActions && typeof loginActions !== 'function' && loginActions}

                    <div className={showLinks ? classes.linksWrapper : undefined}>
                        {enableResetPassword && (
                            <Typography variant="body2" color={'primary'}>
                                <Link className={classes.link} to={routes.FORGOT_PASSWORD}>
                                    {t('pxb:LABELS.FORGOT_PASSWORD')}
                                </Link>
                            </Typography>
                        )}
                        {(showContactSupport || showSelfRegistration) && (
                            <Typography
                                variant="body2"
                                style={{ marginTop: enableResetPassword ? theme.spacing(4) : 0 }}
                            >
                                {t('pxb:LABELS.NEED_ACCOUNT')}
                            </Typography>
                        )}

                        {createAccountOption}
                        {contactEatonRepresentative}
                    </div>
                    {loginFooter && typeof loginFooter === 'function' && loginFooter(null)}
                    {loginFooter && typeof loginFooter !== 'function' && loginFooter}
                    {showCybersecurityBadge && (
                        <img src={cyberBadge} className={classes.cyberBadge} alt="CyberSecurity Certification Badge" />
                    )}
                </div>
            </form>
        </BrandedCardContainer>
    );
};
