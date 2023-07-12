import React, { useCallback, useRef, useState } from 'react';
import { LoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cyberSecurityBadge from '../../../assets/images/cybersecurity_certified.png';
import { PasswordTextField } from '../../components';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { HELPER_TEXT_HEIGHT } from '../../utils/constants';
import { LoginScreenClassKey, getLoginScreenUtilityClass } from './utilityClasses';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import ErrorManager from '../../components/Error/ErrorManager';

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 * @param usernameLabel label for the username field
 * @param usernameTextFieldProps props to pass to the username text field
 * @param usernameValidator function used to validate the username
 * @param initialUsernameValue username used to pre-populate the field
 * @param passwordLabel label for the password field
 * @param passwordTextFieldProps props to pass to the password text field
 * @param passwordValidator function used to validate the password
 * @param showRememberMe whether or not to show the 'remember me' checkbox
 * @param rememberMeLabel label for the 'remember me' checkbox
 * @param rememberMeInitialValue whether or not the 'remember me' checkbox should be checked by default
 * @param onRememberMeChanged callback function that is called when the 'remember me' checkbox is changed
 * @param loginButtonLabel label for the login button
 * @param onLogin callback function that is called when the login button is clicked
 * @param showForgotPassword whether or not to show the 'forgot password' link
 * @param forgotPasswordLabel label for the 'forgot password' link
 * @param onForgotPassword callback function that is called when the 'forgot password' link is clicked
 * @param showSelfRegistration whether or not to show the 'self registration' link
 * @param selfRegisterButtonLabel label for the 'self registration' link
 * @param selfRegisterInstructions instructions for the 'self registration' link
 * @param onSelfRegister callback function that is called when the 'self registration' link is clicked
 * @param showContactSupport whether or not to show the 'contact support' link
 * @param contactSupportLabel label for the 'contact support' link
 * @param onContactSupport callback function that is called when the 'contact support' link is clicked
 * @param errorDisplayConfig configuration for how errors should be displayed
 * @param showCyberSecurityBadge whether or not to show the cyber security badge
 * @param projectImage image to display at the top of the screen
 * @param header header to display at the top of the screen
 * @param footer footer to display at the bottom of the screen
 *
 * @category Component
 */

const LinkStyles = {
    fontWeight: 600,
    textTransform: 'none',
    textDecoration: 'none',
    color: 'primary.main',
    '&:visited': {
        color: 'inherit',
    },
    '&:hover': {
        cursor: 'pointer',
    },
};

const useUtilityClasses = (ownerState: LoginScreenProps): Record<LoginScreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        projectImageWrapper: ['projectImageWrapper'],
        inputFieldsWrapper: ['inputFieldsWrapper'],
        usernameTextField: ['usernameTextField'],
        passwordTextField: ['passwordTextField'],
        rememberMeLoginRowWrapper: ['rememberMeLoginRowWrapper'],
        rememberMeWrapper: ['rememberMeWrapper'],
        rememberMeCheckbox: ['rememberMeCheckbox'],
        rememberMeLabel: ['rememberMeLabel'],
        loginButtonWrapper: ['loginButtonWrapper'],
        loginButton: ['loginButton'],
        forgotPasswordWrapper: ['forgotPasswordWrapper'],
        forgotPasswordLabel: ['forgotPasswordLabel'],
        selfRegisterWrapper: ['selfRegisterWrapper'],
        selfRegisterInstructionLabel: ['selfRegisterInstructionLabel'],
        selfRegisterLabel: ['selfRegisterLabel'],
        contactSupportWrapper: ['contactSupportWrapper'],
        contactSupportLabel: ['contactSupportLabel'],
        cyberSecurityBadgeWrapper: ['cyberSecurityBadgeWrapper'],
        cyberSecurityBadge: ['cyberSecurityBadge'],
    };

    return composeClasses(slots, getLoginScreenUtilityClass, classes);
};

export const LoginScreenBase: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const {
        usernameLabel,
        usernameTextFieldProps,
        usernameValidator,
        initialUsernameValue,
        passwordLabel,
        passwordTextFieldProps,
        passwordValidator,
        showRememberMe,
        rememberMeLabel,
        rememberMeInitialValue,
        onRememberMeChanged,
        loginButtonLabel,
        onLogin,
        showForgotPassword,
        forgotPasswordLabel,
        onForgotPassword,
        showSelfRegistration,
        selfRegisterButtonLabel,
        selfRegisterInstructions,
        onSelfRegister,
        showContactSupport,
        contactSupportLabel,
        onContactSupport,
        errorDisplayConfig,
        showCyberSecurityBadge,
        projectImage,
        header,
        footer,
    } = props;

    // eslint-disable-next-line no-console
    console.log('errorDisplayconfig from login base', errorDisplayConfig);

    const theme = useTheme();
    const defaultClasses = useUtilityClasses(props);

    const [username, setUsername] = React.useState<string>(initialUsernameValue || '');
    const [password, setPassword] = React.useState<string>('');
    const [rememberMe, setRememberMe] = React.useState<boolean>(rememberMeInitialValue);

    const [shouldValidateUsername, setShouldValidateUsername] = React.useState<boolean>(false);
    const [shouldValidatePassword, setShouldValidatePassword] = React.useState<boolean>(false);

    const passwordField = useRef<any>(null);

    const [isUsernameValid, setIsUsernameValid] = useState(usernameValidator ? usernameValidator(username) : true);
    const [isPasswordValid, setIsPasswordValid] = useState(passwordValidator ? passwordValidator(password) : true);

    const [usernameError, setUsernameError] = useState(isUsernameValid === true ? '' : isUsernameValid);
    const [passwordError, setPasswordError] = useState(isPasswordValid === true ? '' : isPasswordValid);

    // const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    // const [showErrorMessageBox, setShowErrorMessageBox] = React.useState(true);
    // const [debugMode, setDebugMode] = React.useState(false);

    const handleUsernameInputChange = useCallback(
        (value: string) => {
            setUsername(value);
            const validatorResponse = usernameValidator(value);

            setIsUsernameValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setUsernameError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [usernameValidator]
    );

    const handlePasswordInputChange = useCallback(
        (value: string) => {
            setPassword(value);
            const validatorResponse = passwordValidator(value);

            setIsPasswordValid(typeof validatorResponse === 'boolean' ? validatorResponse : false);
            setPasswordError(typeof validatorResponse === 'string' ? validatorResponse : '');
        },
        [passwordValidator]
    );

    const handleLogin = (): void => {
        if (onLogin) void onLogin(username, password, rememberMe);
    };

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
    };

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
    };

    const handleRememberMeChanged = (value: boolean): void => {
        if (onRememberMeChanged) {
            onRememberMeChanged(value);
            setRememberMe(value);
        }
    };

    const isFormValid = (): boolean =>
        typeof isUsernameValid === 'boolean' &&
        isUsernameValid &&
        typeof isPasswordValid === 'boolean' &&
        isPasswordValid;

    const handleLoginSubmit = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        // setHasAcknowledgedError(false);
        if (e.key === 'Enter' && isFormValid()) {
            void handleLogin();
        }
    };

    return (
        <>
            <WorkflowCard className={defaultClasses.root} data-testid={defaultClasses.root}>
                <WorkflowCardBody sx={{ py: { xs: 4, sm: 4, md: 4 }, px: { xs: 4, sm: 8, md: 8 } }}>
                    {header}
                    <Box
                        sx={{ display: 'flex', maxWidth: '100%', mb: 6.75 }}
                        className={defaultClasses.projectImageWrapper}
                        data-testid={defaultClasses.projectImageWrapper}
                    >
                        {projectImage}
                    </Box>

                    <ErrorManager {...errorDisplayConfig}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                            className={defaultClasses.inputFieldsWrapper}
                            data-testid={defaultClasses.inputFieldsWrapper}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    mb:
                                        username.length > 0 && !isUsernameValid && shouldValidateUsername
                                            ? 4
                                            : `${(parseInt(theme.spacing(4)) + HELPER_TEXT_HEIGHT).toString()}px`,
                                    [theme.breakpoints.down('sm')]: {
                                        mb:
                                            username.length > 0 && !isUsernameValid && shouldValidateUsername
                                                ? 3
                                                : `${(parseInt(theme.spacing(3)) + HELPER_TEXT_HEIGHT).toString()}px`,
                                    },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    id="username"
                                    className={defaultClasses.usernameTextField}
                                    data-testid={defaultClasses.usernameTextField}
                                    label={usernameLabel || 'Username'}
                                    name="username"
                                    variant="filled"
                                    value={username}
                                    error={shouldValidateUsername && !isUsernameValid}
                                    helperText={shouldValidateUsername && !isUsernameValid ? usernameError : ''}
                                    {...usernameTextFieldProps}
                                    onChange={(e): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        usernameTextFieldProps?.onChange && usernameTextFieldProps.onChange(e);
                                        handleUsernameInputChange(e.target.value);
                                    }}
                                    onSubmit={(e: any): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        usernameTextFieldProps?.onSubmit && usernameTextFieldProps.onSubmit(e);
                                        if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                                    }}
                                    onBlur={(e): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        usernameTextFieldProps?.onBlur && usernameTextFieldProps.onBlur(e);
                                        setShouldValidateUsername(true);
                                    }}
                                    onKeyUp={(e): void => {
                                        if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    mb:
                                        username.length > 0 && !isPasswordValid && shouldValidatePassword
                                            ? 2
                                            : `${(parseInt(theme.spacing(2)) + HELPER_TEXT_HEIGHT).toString()}px`,
                                }}
                            >
                                <PasswordTextField
                                    fullWidth
                                    inputRef={passwordField}
                                    id="password"
                                    className={defaultClasses.passwordTextField}
                                    data-testid={defaultClasses.passwordTextField}
                                    name="password"
                                    label={passwordLabel || 'Password'}
                                    variant="filled"
                                    value={password}
                                    error={shouldValidatePassword && !isPasswordValid}
                                    helperText={shouldValidatePassword && !isPasswordValid ? passwordError : ''}
                                    {...passwordTextFieldProps}
                                    onChange={(e: any): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        passwordTextFieldProps?.onChange && passwordTextFieldProps.onChange(e);
                                        handlePasswordInputChange(e.target.value);
                                    }}
                                    onSubmit={(e: any): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        passwordTextFieldProps?.onSubmit && passwordTextFieldProps.onSubmit(e);
                                        handleLoginSubmit(e);
                                    }}
                                    onBlur={(e): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        passwordTextFieldProps?.onBlur && passwordTextFieldProps.onBlur(e);
                                        setShouldValidatePassword(true);
                                    }}
                                    onKeyUp={(e): void => {
                                        // eslint-disable-next-line no-unused-expressions
                                        passwordTextFieldProps?.onSubmit && passwordTextFieldProps.onSubmit(e);
                                        handleLoginSubmit(e);
                                    }}
                                />
                            </Box>
                        </Box>
                    </ErrorManager>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 1,
                            mb: 5,
                            flexWrap: 'nowrap',
                            [theme.breakpoints.down('sm')]: {
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
                        }}
                        className={defaultClasses.rememberMeLoginRowWrapper}
                        data-testid={defaultClasses.rememberMeLoginRowWrapper}
                    >
                        {showRememberMe && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: -1.5,
                                    mr: 1,
                                    [theme.breakpoints.down('sm')]: {
                                        mr: 0,
                                    },
                                }}
                                className={defaultClasses.rememberMeWrapper}
                                data-testid={defaultClasses.rememberMeWrapper}
                            >
                                <Checkbox
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={(e: any): void => handleRememberMeChanged(e.target.checked)}
                                    className={defaultClasses.rememberMeCheckbox}
                                    data-testid={defaultClasses.rememberMeCheckbox}
                                />
                                <Typography
                                    variant="body1"
                                    className={defaultClasses.rememberMeLabel}
                                    data-testid={defaultClasses.rememberMeLabel}
                                >
                                    {rememberMeLabel || 'Remember Me'}
                                </Typography>
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'flex-end',
                                width: showRememberMe ? 'auto' : '100%',
                            }}
                            className={defaultClasses.loginButtonWrapper}
                            data-testid={defaultClasses.loginButtonWrapper}
                        >
                            <Button
                                className={defaultClasses.loginButton}
                                data-testid={defaultClasses.loginButton}
                                onClick={handleLogin}
                                disabled={!isFormValid()}
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: showRememberMe ? 150 : '100%',
                                }}
                            >
                                {loginButtonLabel || 'Log In'}
                            </Button>
                        </Box>
                    </Box>

                    {showForgotPassword && (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                            className={defaultClasses.forgotPasswordWrapper}
                            data-testid={defaultClasses.forgotPasswordWrapper}
                        >
                            <Typography
                                variant="body2"
                                sx={LinkStyles}
                                onClick={handleForgotPassword}
                                className={defaultClasses.forgotPasswordLabel}
                                data-testid={defaultClasses.forgotPasswordLabel}
                            >
                                {forgotPasswordLabel || 'Forgot your password?'}
                            </Typography>
                        </Box>
                    )}

                    {showSelfRegistration && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                marginTop: 4,
                                textAlign: 'center',
                            }}
                            className={defaultClasses.selfRegisterWrapper}
                            data-testid={defaultClasses.selfRegisterWrapper}
                        >
                            <Typography
                                variant="body2"
                                className={defaultClasses.selfRegisterInstructionLabel}
                                data-testid={defaultClasses.selfRegisterInstructionLabel}
                            >
                                {selfRegisterInstructions || 'Need an account?'}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={LinkStyles}
                                onClick={handleSelfRegister}
                                className={defaultClasses.selfRegisterLabel}
                                data-testid={defaultClasses.selfRegisterLabel}
                            >
                                {selfRegisterButtonLabel || 'Register now!'}
                            </Typography>
                        </Box>
                    )}

                    {showContactSupport && (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, textAlign: 'center' }}
                            className={defaultClasses.contactSupportWrapper}
                            data-testid={defaultClasses.contactSupportWrapper}
                        >
                            <Typography
                                variant="body2"
                                sx={LinkStyles}
                                onClick={handleContactSupport}
                                className={defaultClasses.contactSupportLabel}
                                data-testid={defaultClasses.contactSupportLabel}
                            >
                                {contactSupportLabel || 'Contact Support'}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>

                    {showCyberSecurityBadge && (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
                            className={defaultClasses.cyberSecurityBadgeWrapper}
                            data-testid={defaultClasses.cyberSecurityBadgeWrapper}
                        >
                            <img
                                className={defaultClasses.cyberSecurityBadge}
                                data-testid={defaultClasses.cyberSecurityBadge}
                                src={cyberSecurityBadge}
                                alt="Cyber Security Badge"
                                style={{ width: '100px' }}
                            />
                        </Box>
                    )}
                </WorkflowCardBody>
            </WorkflowCard>
            {/* <ErrorDialog /> */}
        </>
    );
};
