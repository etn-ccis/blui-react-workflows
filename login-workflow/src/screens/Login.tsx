import React, { ChangeEvent, useCallback } from 'react';
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
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
    useSecurityState,
    useLanguageLocale,
    useAccountUIActions,
    useAccountUIState,
    useInjectedUIContext,
    EMAIL_REGEX,
} from '@pxblue/react-auth-shared';
import { Link } from 'react-router-dom';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
import cyberBadge from '../assets/images/cybersecurity_certified.png';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formFields: {
            marginBottom: theme.spacing(5),
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
            '&:visited': {
                color: 'inherit',
            },
        },
        largeIcon: {
            width: 60,
            height: 60,
            color: theme.palette.text.secondary,
        },
    })
);

export const Login: React.FC = () => {
    const securityState = useSecurityState();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();
    const authProps = useInjectedUIContext();
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
    const spinner = transitState.transitInProgress ? <h1>Spinner</h1> /*<Spinner hasHeader={false} />*/ : <></>;

    const hasTransitError = authUIState.login.transitErrorMessage !== null;
    const transitErrorMessage = authUIState.login.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const errorDialog = (
        // <SimpleDialog
        //     title={t('MESSAGES.ERROR')}
        //     bodyText={t(transitErrorMessage)}
        //     visible={hasTransitError && !hasAcknowledgedError}
        //     onDismiss={(): void => {
        //         setHasAcknowledgedError(true);
        //     }}
        // />
        <h1>DIALOG</h1>
    );

    // Construct the optional elements
    const contactEatonRepresentative: JSX.Element = (
        <Typography variant="body2" color={'primary'}>
            <Link className={classes.link} to="/support">
                {t('MESSAGES.CONTACT')}
            </Link>
        </Typography>
    );

    // const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
    // const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    const showSelfRegistration = authProps.showSelfRegistration ?? true; // enabled by default

    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration || debugMode) {
        createAccountOption = (
            <Typography variant="body2" color={'primary'} style={{ marginBottom: theme.spacing(4) }}>
                <Link className={classes.link} to="/register/create-account">
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
                <Link className={classes.link} to="/reset-password?code=DEBUG_VALIDATION_CODE_DEADBEEF">
                    [Test Forgot Password Email]
                </Link>
            </Typography>
        );
    }

    let testInviteRegisterButton: JSX.Element = <></>;
    if (debugMode) {
        testInviteRegisterButton = (
            <Typography variant="body2">
                <Link className={classes.link} to="/register/invite?code=DEBUG_VALIDATION_CODE_DEADBEEF">
                    [Test Invite Register]
                </Link>
            </Typography>
        );
    }

    return (
        <BrandedCardContainer>
            {/* {spinner} */}
            {/* {errorDialog} */}
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

                    {/* {this.state.inActiveLogout && (
                        <Typography variant="subtitle1" color="error" style={{ paddingBottom: 10 }}>
                            {t('INACTIVITY.INACTIVE_LOGOUT')}
                        </Typography>
                    )} */}

                    <TextField
                        label={t('LABELS.EMAIL')}
                        id="email"
                        name="email"
                        type="email"
                        className={classes.formFields}
                        value={emailInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setEmailInput(evt.target.value)}
                        variant="filled"
                        error={hasTransitError}
                        helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        label={t('LABELS.PASSWORD')}
                        className={classes.formFields}
                        value={passwordInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                        variant="filled"
                        error={hasTransitError}
                        helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
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
                            <Link className={classes.link} to="/forgot-password">
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
