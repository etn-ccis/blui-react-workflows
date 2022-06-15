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
} from '@brightlayer-ui/react-auth-shared';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Theme, useTheme } from '@mui/material/styles';
import { BrandedCardContainer, SimpleDialog, SecureTextField } from '../components';
import Close from '@mui/icons-material/Close';
import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
import cyberBadge from '../assets/images/cybersecurity_certified.png';
import * as Colors from '@brightlayer-ui/colors';
import Box from '@mui/material/Box';

const HELPER_TEXT_HEIGHT = 22;

const LinkStyles = (theme: Theme) => ({
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:visited': {
        color: 'inherit',
    },
});

const LinksWrapperStyles = (theme: Theme) => ({
    textAlign: 'center',
    pb: 4,
});

/**
 * Login screen with loading and error states, as well as "remember me" functionality to store a user's email between logins.
 * Requires being wrapped in an [[AuthNavigationContainer]] for access to global state and actions for authentication and registration.
 * Has a debug mode which shows buttons that allow direct access to the deep link flows (invite registration, set password from forgot password, etc.).
 *
 *
 * @category Component
 */
export const Login: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const securityState = useSecurityState();
    const { t } = useLanguageLocale();
    const authUIActions = useAccountUIActions();
    const authUIState = useAccountUIState();
    const { routes } = useRoutes();
    const theme = useTheme();
    const { loginErrorDisplayConfig = { mode: 'dialog' }, ...otherUIContext } = useInjectedUIContext();
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
            <Box sx={{ mb: 6 }}>
                <Box
                    component="img"
                    sx={{ maxWidth: '100%', maxHeight: 80 }}
                    src={projectImage || stackedEatonLogo}
                    alt="logo"
                />
            </Box>
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
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: loginErrorDisplayConfig.backgroundColor || theme.palette.error.main,
                    borderRadius: 4,
                    p: 16,
                    color: loginErrorDisplayConfig.fontColor || Colors.white[50],
                    mb: 16,
                    mt: loginErrorDisplayConfig.position !== 'bottom' ? 0 : -1,
                }}
            >
                {loginErrorDisplayConfig.dismissible !== false && (
                    <Close
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                            float: 'right',
                        }}
                        onClick={(): void => {
                            setShowErrorMessageBox(false);
                        }}
                    />
                )}
                <Typography variant="body2">{t(transitErrorMessage)}</Typography>
            </Box>
        ) : (
            <></>
        );

    const contactEatonRepresentative: JSX.Element = showContactSupport ? (
        <Typography variant="body2" color={'primary'}>
            <Box component={Link} sx={LinkStyles(theme)} to={routes.SUPPORT}>
                {t('blui:MESSAGES.CONTACT')}
            </Box>
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
            <Typography variant="body2" color={'primary'} sx={{ mb: 4 }}>
                <Box component={Link} sx={LinkStyles(theme)} to={routes.REGISTER_SELF}>
                    {t('blui:ACTIONS.CREATE_ACCOUNT')}
                </Box>
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
                sx={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                }}
            >{`DEBUG`}</Button>
        );
    }

    let debugMessage: JSX.Element = <></>;
    if (debugMode) {
        debugMessage = (
            <Box
                sx={{
                    backgroundColor: Colors.yellow[500],
                    p: 1,
                    mb: 2,
                }}
            >
                <Typography variant={'h6'} align={'center'}>
                    DEBUG MODE
                </Typography>
            </Box>
        );
    }

    const debugLinks = !debugMode ? null : (
        <Box sx={LinksWrapperStyles}>
            <Typography variant="body2">
                <Box
                    component={Link}
                    sx={LinkStyles(theme)}
                    to={`${routes.REGISTER_INVITE}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}
                >
                    [Test Invite Register]
                </Box>
            </Typography>
            <Typography variant="body2">
                <Box component={Link} sx={LinkStyles(theme)} to={routes.REGISTER_SELF}>
                    [Test Self Register]
                </Box>
            </Typography>
            <Typography variant="body2">
                <Box component={Link} sx={LinkStyles(theme)} to={`${routes.FORGOT_PASSWORD}`}>
                    [Test Forgot Password]
                </Box>
            </Typography>
            <Typography variant="body2">
                <Box
                    component={Link}
                    sx={LinkStyles(theme)}
                    to={`${routes.RESET_PASSWORD}?code=DEBUG_VALIDATION_CODE_DEADBEEF`}
                >
                    [Test Reset Password Email]
                </Box>
            </Typography>
            <Typography variant="body2">
                <Box component={Link} sx={LinkStyles(theme)} to={`${routes.SUPPORT}`}>
                    [Test Contact Support]
                </Box>
            </Typography>
        </Box>
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
                <Box
                    sx={{
                        p: `${theme.spacing(4)} ${theme.spacing(8)}`,
                        display: 'flex',
                        flexDirection: 'column',
                        [theme.breakpoints.down('sm')]: {
                            p: `${theme.spacing(4)} ${theme.spacing(4)}`,
                        },
                    }}
                >
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
                        sx={{
                            mb:
                                isInvalidCredentials || hasEmailError()
                                    ? 4
                                    : `${(parseInt(theme.spacing(4)) + HELPER_TEXT_HEIGHT).toString()}px`,
                            [theme.breakpoints.down('sm')]: {
                                mb:
                                    isInvalidCredentials || hasEmailError()
                                        ? 3
                                        : `${(parseInt(theme.spacing(3)) + HELPER_TEXT_HEIGHT).toString()}px`,
                            },
                        }}
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
                        sx={{
                            mb: isInvalidCredentials
                                ? 3
                                : `${(parseInt(theme.spacing(3)) + HELPER_TEXT_HEIGHT).toString()}px`,
                        }}
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
                        justifyContent="space-between"
                        sx={{
                            mb: 5,
                            flexWrap: 'nowrap',
                            [theme.breakpoints.down('sm')]: {
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        {showRememberMe && (
                            <FormControlLabel
                                sx={{
                                    [theme.breakpoints.down('sm')]: {
                                        mr: 0,
                                    },
                                }}
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
                            sx={{ width: showRememberMe ? 150 : '100%' }}
                        >
                            {t('blui:ACTIONS.LOG_IN')}
                        </Button>
                    </Grid>

                    {loginActions && typeof loginActions === 'function' && loginActions(null)}
                    {loginActions && typeof loginActions !== 'function' && loginActions}

                    <Box sx={showLinks ? LinksWrapperStyles : undefined}>
                        {enableResetPassword && (
                            <Typography variant="body2" color={'primary'}>
                                <Box component={Link} sx={LinkStyles(theme)} to={routes.FORGOT_PASSWORD}>
                                    {t('blui:LABELS.FORGOT_PASSWORD')}
                                </Box>
                            </Typography>
                        )}
                        {(showContactSupport || showSelfRegistration) && (
                            <Typography variant="body2" sx={{ mt: enableResetPassword ? 4 : 0 }}>
                                {t('blui:LABELS.NEED_ACCOUNT')}
                            </Typography>
                        )}

                        {createAccountOption}
                        {contactEatonRepresentative}
                    </Box>
                    {loginFooter && typeof loginFooter === 'function' && loginFooter(null)}
                    {loginFooter && typeof loginFooter !== 'function' && loginFooter}
                    {showCybersecurityBadge && (
                        <Box
                            component="img"
                            src={cyberBadge}
                            sx={{
                                alignSelf: 'center',
                                maxWidth: '30%',
                            }}
                            alt="CyberSecurity Certification Badge"
                        />
                    )}
                </Box>
            </form>
        </BrandedCardContainer>
    );
};
