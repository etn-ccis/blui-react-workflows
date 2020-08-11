import React, { ChangeEvent, useCallback } from 'react';
import { useTheme, Typography, TextField, Theme, createStyles, makeStyles, InputAdornment, IconButton, Grid, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useSecurityState, useLanguageLocale, useAccountUIActions, useAccountUIState, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { useHistory, Link } from 'react-router-dom';
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
        },
        largeIcon: {
            width: 60,
            height: 60,
            color: theme.palette.text.secondary,
        },
    }));

export const Login: React.FC = () => {
    const securityState = useSecurityState();
    const [rememberPassword, setRememberPassword] = React.useState(securityState.rememberMeDetails.rememberMe ?? false);
    const [emailInput, setEmailInput] = React.useState(securityState.rememberMeDetails.email ?? '');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    const [debugMode, setDebugMode] = React.useState(false);

    const history = useHistory();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();
    const authProps = useInjectedUIContext();

    const theme = useTheme();
    const classes = useStyles();

    const loginTapped = useCallback((): void => {
        setHasAcknowledgedError(false);
        authUIActions.actions.logIn(emailInput, passwordInput, rememberPassword);
    }, [setHasAcknowledgedError, authUIActions]);

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
    let contactEatonRepresentative: JSX.Element = (
        <Button variant={'text'} color={'primary'}
            onClick={(): void => history.push(`/support`)}
        >{t('MESSAGES.CONTACT')}</Button>
    );

    // const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
    // const goToNextInput = (): void => confirmPasswordRef?.current?.focus();

    const showSelfRegistration = authProps.showSelfRegistration ?? true; // enabled by default
    
    let createAccountOption: JSX.Element = <></>;
    if (showSelfRegistration || debugMode) {
        createAccountOption = (
            <Button variant={'text'} color={'primary'}
            onClick={(): void => history.push(`/register/create-account`)}
        >{t('ACTIONS.CREATE_ACCOUNT')}</Button>
        );
    }

    // Create buttons for debug mode
    const allowDebugMode = authProps.allowDebugMode ?? false; // don't allow debug mode by default
    let debugButton: JSX.Element = <></>;
    if (allowDebugMode) {
        debugButton = (
            <Button variant={'contained'} color={'primary'} onClick={(): void => setDebugMode(!debugMode)}>{`DEBUG`}</Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <div style={{ backgroundColor: Colors.yellow[500], padding: theme.spacing(1) }}>
                <Typography variant={'h6'} align={'center'}>DEBUG MODE</Typography>
            </div>
        );
    }

    let testForgotPasswordDeepLinkButton: JSX.Element = <></>;
    if (debugMode) {
        testForgotPasswordDeepLinkButton = (
            <Button variant={'text'}
                onClick={(): void => history.push(`/reset-password/complete?code=DEBUG_VALIDATION_CODE_DEADBEEF`)}
            >[Test Forgot Password Email]</Button>
        );
    }

    let testInviteRegisterButton: JSX.Element = <></>;
    if (debugMode) {
        testInviteRegisterButton = (
            <Button variant={'text'}
                onClick={(): void => history.push(`/register/invite?code=DEBUG_VALIDATION_CODE_DEADBEEF`)}
            >[Test Invite Register]</Button>
        );
    }

    return (
        <BrandedCardContainer>
            {spinner}
            {errorDialog}
            <form
                data-testid="login-form"
                onSubmit={(evt): void => {
                    evt.preventDefault();
                    // this.onLogIn();
                }}
            >
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ paddingBottom: 50 }}>
                        <img style={{ maxWidth: '100%' }} src={stackedEatonLogo} alt="logo" />
                    </div>
                    {debugButton}
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
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void =>
                            setEmailInput(evt.target.value)
                        }
                        variant="filled"
                        // error={Boolean(this.state.message)}
                        // helperText={t(this.state.message)}
                        inputProps={{
                            'data-testid': 'email',
                        }}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        label={t('LABELS.PASSWORD')}
                        className={classes.formFields}
                        value={passwordInput}
                        onChange={(evt: ChangeEvent<HTMLInputElement>): void =>
                            setPasswordInput(evt.target.value)
                        }
                        variant="filled"
                        // error={Boolean(this.state.message)}
                        // helperText={t(this.state.message)}
                        inputProps={{
                            'data-testid': 'password',
                        }}
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
                            // disabled={!this.canLogIn()}
                            color="primary"
                            style={{ width: 150 }}
                            data-testid="login"
                        >
                            {t('ACTIONS.LOG_IN')}
                        </Button>
                    </Grid>
                    <div style={{ textAlign: 'center', paddingBottom: 32 }}>
                        <Typography variant="body2">
                            <Link
                                className={classes.link}
                                to="/forgot-password"
                                data-testid="forgot-password-link"
                            >
                                {t('LABELS.FORGOT_PASSWORD')}
                            </Link>
                        </Typography>
                        <Typography variant="body2">{t('LABELS.NEED_ACCOUNT')}</Typography>
                        {/* <Typography variant="body2">
                            <Button
                                color="primary"
                                className={classes.link}
                                // onClick={(): void => this.setState({ showDialog: true })}
                            >
                                {t('MESSAGES.CONTACT')}
                            </Button>
                        </Typography> */}
                        {createAccountOption}
                        {contactEatonRepresentative}
                    </div>
                    <img src={cyberBadge} style={{alignSelf: 'center', maxWidth: '30%'}} alt="CyberSecurity Certification Badge" />
                </div>
            </form>
        </BrandedCardContainer>

    )
}