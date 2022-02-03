import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useRoutes } from '../contexts/RoutingContext';
import {
    useSecurityState,
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
    useInjectedUIContext,
    AccountActions,
    LoginErrorDisplayConfig,
    EMAIL_REGEX,
} from '@brightlayer-ui/react-auth-shared';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { BrandedCardContainer, SimpleDialog, SecureTextField } from '../components';
import Close from '@material-ui/icons/Close';
import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
import cyberBadge from '../assets/images/cybersecurity_certified.png';
import * as Colors from '@brightlayer-ui/colors';
import clsx from 'clsx';

const HELPER_TEXT_HEIGHT = 22;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emailFormField: {
            marginBottom: theme.spacing(4) + HELPER_TEXT_HEIGHT,
            '&$hasError': {
                marginBottom: theme.spacing(4),
            },
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(3) + HELPER_TEXT_HEIGHT,
                '&$hasError': {
                    marginBottom: theme.spacing(3),
                },
            },
        },
        passwordFormField: {
            marginBottom: theme.spacing(3) + HELPER_TEXT_HEIGHT,
            '&$hasError': {
                marginBottom: theme.spacing(3),
            },
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
        errorMessageBox: {
            width: '100%',
            backgroundColor: (loginErrorDisplayConfig: LoginErrorDisplayConfig) =>
                loginErrorDisplayConfig.backgroundColor || theme.palette.error.main,
            borderRadius: 4,
            padding: 16,
            color: (loginErrorDisplayConfig: LoginErrorDisplayConfig) =>
                loginErrorDisplayConfig.fontColor || Colors.white[50],
            marginBottom: 16,
            marginTop: (loginErrorDisplayConfig: LoginErrorDisplayConfig) =>
                loginErrorDisplayConfig.position !== 'bottom' ? 0 : theme.spacing(-1),
        },
        errorBoxDismissIcon: {
            '&:hover': {
                cursor: 'pointer',
            },
            float: 'right',
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
    const { loginErrorDisplayConfig = { mode: 'dialog' }, ...otherUIContext } = useInjectedUIContext();
    const classes = useStyles(loginErrorDisplayConfig);
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
    } = otherUIContext;

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

    const [showErrorMessageBox, setShowErrorMessageBox] = React.useState(false);

    const loginTapped = useCallback((): void => {
        setHasAcknowledgedError(false);
        void authUIActions.actions.logIn(emailInput, passwordInput, showRememberMe ? rememberPassword : false);
    }, [setHasAcknowledgedError, authUIActions, emailInput, passwordInput, rememberPassword, showRememberMe]);

    const transitState = authUIState.login;
    const showLinks = showSelfRegistration || enableResetPassword || showContactSupport;

    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');

    const isInvalidCredentials =
        transitErrorMessage.replace('blui:', '') === 'LOGIN.INCORRECT_CREDENTIALS' ||
        transitErrorMessage.replace('blui:', '') === 'LOGIN.INVALID_CREDENTIALS';

    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [shouldValidateEmail, setShouldValidateEmail] = React.useState(false);

    useEffect(
        () => {
            authUIActions.dispatch(AccountActions.resetLogin());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        if (hasTransitError) {
            setShowErrorMessageBox(true);
        }
    }, [hasTransitError]);

    const hasEmailError = useCallback(
        (): boolean => loginType === 'email' && shouldValidateEmail && emailInput.length !== 0 && !isValidEmail,
        [shouldValidateEmail, emailInput, isValidEmail, loginType]
    );

    // Construct the dynamic elements
    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            body={t(transitErrorMessage)}
            open={hasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    const errorMessageBox: JSX.Element =
        !isInvalidCredentials && hasTransitError && transitErrorMessage && showErrorMessageBox ? (
            <div className={classes.errorMessageBox}>
                {loginErrorDisplayConfig.dismissible !== false && (
                    <Close
                        className={classes.errorBoxDismissIcon}
                        onClick={(): void => {
                            setShowErrorMessageBox(false);
                        }}
                    />
                )}
                <Typography variant="body2">{t(transitErrorMessage)}</Typography>
            </div>
        ) : (
            <></>
        );

    const contactEatonRepresentative: JSX.Element = showContactSupport ? (
        <Typography variant="body2" color={'primary'}>
            <Link className={classes.link} to={routes.SUPPORT}>
                {t('blui:MESSAGES.CONTACT')}
            </Link>
        </Typography>
    ) : (
        <></>
    );

    const getEmailHelperText = (): string => {
        if (hasEmailError()) {
            return t('blui:MESSAGES.EMAIL_ENTRY_ERROR');
        } else if (isInvalidCredentials) {
            return t('blui:LOGIN.INCORRECT_CREDENTIALS');
        }
        return '';
    };

    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration) {
        createAccountOption = (
            <Typography variant="body2" color={'primary'} style={{ marginBottom: theme.spacing(4) }}>
                <Link className={classes.link} to={routes.REGISTER_SELF}>
                    {t('blui:ACTIONS.CREATE_ACCOUNT')}
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
            {!isInvalidCredentials &&
                (loginErrorDisplayConfig.mode === 'dialog' || loginErrorDisplayConfig.mode === 'both') &&
                transitErrorMessage &&
                errorDialog}
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

                    {(loginErrorDisplayConfig.mode === 'message-box' || loginErrorDisplayConfig.mode === 'both') &&
                        loginErrorDisplayConfig.position !== 'bottom' &&
                        errorMessageBox}

                    <TextField
                        label={loginType === 'username' ? t('blui:LABELS.USERNAME') : t('blui:LABELS.EMAIL')}
                        id="email"
                        name={loginType === 'username' ? 'username' : 'email'}
                        type={loginType === 'username' ? 'text' : 'email'}
                        className={clsx(classes.emailFormField, {
                            [classes.hasError]: isInvalidCredentials || hasEmailError(),
                        })}
                        value={emailInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                            const { value } = evt.target;
                            setIsValidEmail(EMAIL_REGEX.test(value));
                            setEmailInput(value);
                            if (authUIState.login.transitErrorMessage !== null)
                                authUIActions.dispatch(AccountActions.resetLogin());
                        }}
                        onKeyPress={(e): void => {
                            if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                        }}
                        onBlur={(): void => {
                            setShouldValidateEmail(true);
                        }}
                        variant="filled"
                        error={hasEmailError() || isInvalidCredentials}
                        helperText={getEmailHelperText()}
                    />
                    <SecureTextField
                        inputRef={passwordField}
                        id="password"
                        name="password"
                        label={t('blui:LABELS.PASSWORD')}
                        className={clsx(classes.passwordFormField, { [classes.hasError]: isInvalidCredentials })}
                        value={passwordInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                            setPasswordInput(evt.target.value);
                            if (authUIState.login.transitErrorMessage !== null)
                                authUIActions.dispatch(AccountActions.resetLogin());
                        }}
                        variant="filled"
                        error={isInvalidCredentials}
                        helperText={isInvalidCredentials ? t('blui:LOGIN.INCORRECT_CREDENTIALS') : ''}
                    />

                    {(loginErrorDisplayConfig.mode === 'message-box' || loginErrorDisplayConfig.mode === 'both') &&
                        loginErrorDisplayConfig.position === 'bottom' &&
                        errorMessageBox}

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
                                label={t('blui:ACTIONS.REMEMBER')}
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
                        >
                            {t('blui:ACTIONS.LOG_IN')}
                        </Button>
                    </Grid>

                    {loginActions && typeof loginActions === 'function' && loginActions(null)}
                    {loginActions && typeof loginActions !== 'function' && loginActions}

                    <div className={showLinks ? classes.linksWrapper : undefined}>
                        {enableResetPassword && (
                            <Typography variant="body2" color={'primary'}>
                                <Link className={classes.link} to={routes.FORGOT_PASSWORD}>
                                    {t('blui:LABELS.FORGOT_PASSWORD')}
                                </Link>
                            </Typography>
                        )}
                        {(showContactSupport || showSelfRegistration) && (
                            <Typography
                                variant="body2"
                                style={{ marginTop: enableResetPassword ? theme.spacing(4) : 0 }}
                            >
                                {t('blui:LABELS.NEED_ACCOUNT')}
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
