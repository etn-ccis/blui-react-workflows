import React, { ChangeEvent, useCallback } from 'react';

// Hooks
import { useRoutes } from '../contexts/RoutingContext';
import {
    useSecurityState,
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
    useInjectedUIContext,
    EMAIL_REGEX,
} from '@pxblue/react-auth-shared';

// Components
import { Link } from 'react-router-dom';
import {
    useTheme,
    Typography,
    TextField,
    Theme,
    createStyles,
    makeStyles,
    InputAdornment,
    IconButton,
    Grid,
    FormControlLabel,
    Checkbox,
    Button,
} from '@material-ui/core';
import { BrandedCardContainer, SimpleDialog } from '../components';

// Styles
import { Visibility, VisibilityOff } from '@material-ui/icons';
import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
import cyberBadge from '../assets/images/cybersecurity_certified.png';
import * as Colors from '@pxblue/colors';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formFields: {
            marginBottom: theme.spacing(5),
            '&$hasError': {
                marginBottom: theme.spacing(5) - 22, // height of error message
            },
        },
        buttonRow: {
            marginBottom: theme.spacing(5),
            flexWrap: 'nowrap',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap',
                flexDirection: 'column-reverse',
                justifyContent: 'center',
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
        largeIcon: {
            width: 60,
            height: 60,
            color: theme.palette.text.secondary,
        },
        hasError: {},
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
    const authProps = useInjectedUIContext();
    const { routes } = useRoutes();
    const theme = useTheme();
    const classes = useStyles();

    const [rememberPassword, setRememberPassword] = React.useState(securityState.rememberMeDetails.rememberMe ?? false);
    const [emailInput, setEmailInput] = React.useState(securityState.rememberMeDetails.email ?? '');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [debugMode, setDebugMode] = React.useState(false);

    const loginTapped = useCallback((): void => {
        setHasAcknowledgedError(false);
        void authUIActions.actions.logIn(emailInput, passwordInput, rememberPassword);
    }, [setHasAcknowledgedError, authUIActions, emailInput, passwordInput, rememberPassword]);

    const transitState = authUIState.login;

    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');

    // Construct the dynamic elements
    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            body={t(transitErrorMessage)}
            open={hasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    const contactEatonRepresentative: JSX.Element = (
        <Typography variant="body2" color={'primary'}>
            <Link className={classes.link} to={routes.SUPPORT}>
                {t('MESSAGES.CONTACT')}
            </Link>
        </Typography>
    );

    const showSelfRegistration = authProps.showSelfRegistration ?? true; // enabled by default

    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration || debugMode) {
        createAccountOption = (
            <Typography variant="body2" color={'primary'} style={{ marginBottom: theme.spacing(4) }}>
                <Link className={classes.link} to={routes.REGISTER_SELF}>
                    {t('ACTIONS.CREATE_ACCOUNT')}
                </Link>
            </Typography>
        );
    }

    // Create buttons for debug mode
    const allowDebugMode = authProps.allowDebugMode ?? false; // don't allow debug mode by default
    let debugButton: JSX.Element = <></>;
    if (allowDebugMode) {
        debugButton = (
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={(): void => setDebugMode(!debugMode)}
                style={{ position: 'absolute', top: theme.spacing(2), right: theme.spacing(2) }}
            >{`DEBUG`}</Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <div
                style={{
                    backgroundColor: Colors.yellow[500],
                    padding: theme.spacing(1),
                    marginBottom: theme.spacing(2),
                }}
            >
                <Typography variant={'h6'} align={'center'}>
                    DEBUG MODE
                </Typography>
            </div>
        );
    }

    let testForgotPasswordDeepLinkButton: JSX.Element = <></>;
    if (debugMode) {
        testForgotPasswordDeepLinkButton = (
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.RESET_PASSWORD}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}>
                    [Test Forgot Password Email]
                </Link>
            </Typography>
        );
    }

    let testInviteRegisterButton: JSX.Element = <></>;
    if (debugMode) {
        testInviteRegisterButton = (
            <Typography variant="body2">
                <Link className={classes.link} to={`${routes.REGISTER_INVITE}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}>
                    [Test Invite Register]
                </Link>
            </Typography>
        );
    }

    return (
        <BrandedCardContainer loading={transitState.transitInProgress}>
            {errorDialog}
            {debugButton}
            <form
                data-testid="login-form"
                onSubmit={(evt): void => {
                    evt.preventDefault();
                    loginTapped();
                }}
            >
                <div
                    style={{
                        padding: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ paddingBottom: theme.spacing(6) }}>
                        <img style={{ maxWidth: '100%', maxHeight: 80 }} src={stackedEatonLogo} alt="logo" />
                    </div>

                    {debugMessage}

                    <TextField
                        label={t('LABELS.EMAIL')}
                        id="email"
                        name="email"
                        type="email"
                        className={clsx(classes.formFields, { [classes.hasError]: hasTransitError })}
                        value={emailInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                        variant="filled"
                        error={hasTransitError}
                        helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : ''}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        label={t('LABELS.PASSWORD')}
                        className={clsx(classes.formFields, { [classes.hasError]: hasTransitError })}
                        value={passwordInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                        variant="filled"
                        error={hasTransitError}
                        helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={(): void => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        className={classes.buttonRow}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={rememberPassword}
                                    onChange={(evt): void => setRememberPassword(evt.target.checked)}
                                />
                            }
                            label={t('ACTIONS.REMEMBER')}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!EMAIL_REGEX.test(emailInput) || !passwordInput}
                            color="primary"
                            style={{ width: 150 }}
                            onClick={loginTapped}
                        >
                            {t('ACTIONS.LOG_IN')}
                        </Button>
                    </Grid>

                    <div style={{ textAlign: 'center', paddingBottom: 32 }}>
                        {testForgotPasswordDeepLinkButton}
                        {testInviteRegisterButton}

                        <Typography variant="body2" color={'primary'}>
                            <Link className={classes.link} to={routes.FORGOT_PASSWORD}>
                                {t('LABELS.FORGOT_PASSWORD')}
                            </Link>
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: theme.spacing(4) }}>
                            {t('LABELS.NEED_ACCOUNT')}
                        </Typography>

                        {createAccountOption}
                        {contactEatonRepresentative}
                    </div>
                    <img
                        src={cyberBadge}
                        style={{ alignSelf: 'center', maxWidth: '30%' }}
                        alt="CyberSecurity Certification Badge"
                    />
                </div>
            </form>
        </BrandedCardContainer>
    );
};
