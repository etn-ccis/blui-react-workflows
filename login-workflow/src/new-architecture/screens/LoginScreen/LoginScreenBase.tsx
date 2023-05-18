import React, { useRef } from 'react';
import { LoginScreenProps } from './types';
import { WorkflowCard } from '../../components/WorkflowCard';
import { WorkflowCardBody } from '../../components/WorkflowCard/WorkflowCardBody';
import { WorkflowCardHeader } from '../../components/WorkflowCard/WorkflowCardHeader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import cyberSecurityBadge from '../../../assets/images/cyber-security-badge.png';
import { SimpleDialog } from '../../components';
import Button from '@mui/material/Button';

/**
 * Component that renders a login screen that prompts a user to enter a username and password to login.
 *
 *
 * @param usernameLabel label for the username field
 * @param usernameValidator function used to validate the username
 * @param initialUsernameValue username used to pre-populate the field
 * @param passwordLabel label for the password field
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

export const LoginScreenBase: React.FC<React.PropsWithChildren<LoginScreenProps>> = (props) => {
    const {
        usernameLabel,
        usernameValidator,
        initialUsernameValue,
        passwordLabel,
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

    const [username, setUsername] = React.useState<string>(initialUsernameValue || '');
    const [password, setPassword] = React.useState<string>('');
    const [shouldValidateUsername, setShouldValidateUsername] = React.useState<boolean>(false);
    const [shouldValidatePassword, setShouldValidatePassword] = React.useState<boolean>(false);

    const passwordField = useRef<any>(null);

    const isUsernameValid = usernameValidator ? usernameValidator(username) : true;
    const isPasswordValid = passwordValidator ? passwordValidator(password) : true;

    const usernameError = isUsernameValid === true ? '' : isUsernameValid;
    const passwordError = isPasswordValid === true ? '' : isPasswordValid;

    const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    // const [debugMode, setDebugMode] = React.useState(false);

    const handleUsernameInputChange = (value: string): void => {
        setUsername(value);
        setShouldValidateUsername(false);
        // eslint-disable-next-line no-console
        console.log('handleUsernameInputChange: ', value);
    };

    const handlePasswordInputChange = (value: string): void => {
        setPassword(value);
        setShouldValidatePassword(false);
        // eslint-disable-next-line no-console
        console.log('handlePasswordInputChange: ', value);
    };

    const handleLogin = (): void => {
        if (onLogin) onLogin(username, password);
        // eslint-disable-next-line no-console
        console.log('handleLogin: ', username, password);
    };

    const handleForgotPassword = (): void => {
        if (onForgotPassword) onForgotPassword();
        // eslint-disable-next-line no-console
        console.log('handleForgotPassword: ');
    };

    const handleSelfRegister = (): void => {
        if (onSelfRegister) onSelfRegister();
        // eslint-disable-next-line no-console
        console.log('handleSelfRegister: ');
    };

    const handleContactSupport = (): void => {
        if (onContactSupport) onContactSupport();
        // eslint-disable-next-line no-console
        console.log('handleContactSupport: ');
    };

    const handleRememberMeChanged = (value: boolean): void => {
        if (onRememberMeChanged) onRememberMeChanged(value);
        // eslint-disable-next-line no-console
        console.log('handleRememberMeChanged: ', value);
    };

    const shouldValidate = (): boolean => shouldValidateUsername || shouldValidatePassword;

    const isFormValid = (): boolean =>
        typeof isUsernameValid === 'boolean' &&
        isUsernameValid &&
        typeof isPasswordValid === 'boolean' &&
        isPasswordValid;

    const handleLoginSubmit = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        // eslint-disable-next-line no-console
        console.log('handleLoginSubmit: ', e);
        if (e.key === 'Enter' && isFormValid()) {
            handleLogin();
        }
    };

    const errorDisplayConfigProps = {
        ...errorDisplayConfig,
        usernameError,
        passwordError,
        shouldValidate,
        isFormValid,
    };

    // eslint-disable-next-line no-console
    console.log('errorDisplayConfigProps: ', errorDisplayConfigProps);

    const errorDialog = (
        <SimpleDialog
            title={'Error!'}
            body={
                (typeof usernameError === 'string' && usernameError) ||
                (typeof passwordError === 'string' && passwordError)
            }
            open={
                !hasAcknowledgedError &&
                ((typeof usernameError === 'boolean' && usernameError) ||
                    (typeof passwordError === 'boolean' && passwordError))
            }
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );
    // eslint-disable-next-line no-console
    console.log('errorDialog: ', errorDialog);

    // const errorMessageBox: JSX.Element =
    //     !isInvalidCredentials && hasTransitError && transitErrorMessage && showErrorMessageBox ? (
    //         <Box
    //             sx={{
    //                 width: '100%',
    //                 backgroundColor: errorDisplayConfigProps.backgroundColor || theme.palette.error.main,
    //                 borderRadius: 4,
    //                 p: 16,
    //                 color: errorDisplayConfigProps.fontColor || Colors.white[50],
    //                 mb: 16,
    //                 mt: errorDisplayConfigProps.position !== 'bottom' ? 0 : -1,
    //             }}
    //         >
    //             {errorDisplayConfigProps.dismissible !== false && (
    //                 <Close
    //                     sx={{
    //                         '&:hover': {
    //                             cursor: 'pointer',
    //                         },
    //                         float: 'right',
    //                     }}
    //                     onClick={(): void => {
    //                         setShowErrorMessageBox(false);
    //                     }}
    //                 />
    //             )}
    //             <Typography variant="body2">{t(transitErrorMessage)}</Typography>
    //         </Box>
    //     ) : (
    //         <></>
    //     );

    return (
        <WorkflowCard>
            <WorkflowCardBody>
                <WorkflowCardHeader>{header}</WorkflowCardHeader>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>{projectImage}</Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <TextField
                            fullWidth
                            id="username"
                            label={usernameLabel || 'Username'}
                            variant="outlined"
                            value={username}
                            error={shouldValidateUsername && !isUsernameValid}
                            helperText={shouldValidateUsername && !isUsernameValid ? usernameError : ''}
                            onChange={(e): void => handleUsernameInputChange(e.target.value)}
                            onSubmit={(e: any): void => {
                                if (e.key === 'Enter' && passwordField.current) passwordField.current.focus();
                            }}
                            onBlur={(): void => setShouldValidateUsername(true)}
                        />
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: 400, marginTop: 2 }}>
                        <TextField
                            fullWidth
                            inputRef={passwordField}
                            id="password"
                            label={passwordLabel || 'Password'}
                            variant="outlined"
                            type="password"
                            value={password}
                            error={shouldValidatePassword && !isPasswordValid}
                            helperText={shouldValidatePassword && !isPasswordValid ? passwordError : ''}
                            onChange={(e: any): void => handlePasswordInputChange(e.target.value)}
                            onSubmit={(e: any): void => handleLoginSubmit(e.target.value)}
                            onBlur={(): void => setShouldValidatePassword(true)}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 2,
                    }}
                >
                    {showRememberMe && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                checked={rememberMeInitialValue}
                                onChange={(e): void => handleRememberMeChanged(e.target.checked)}
                            />
                            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                                {rememberMeLabel || 'Remember Me'}
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', maxWidth: 400, marginTop: 2 }}>
                        <Button
                            onClick={handleLogin}
                            disabled={!isFormValid()}
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', maxWidth: 400, marginTop: 2 }}
                        >
                            {loginButtonLabel || 'Login'}
                        </Button>
                    </Box>
                </Box>

                {showForgotPassword && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Typography variant="body1" sx={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                            {forgotPasswordLabel || 'Forgot Password?'}
                        </Typography>
                    </Box>
                )}

                {showSelfRegistration && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Typography variant="body1">{selfRegisterInstructions || "Don't have an account?"}</Typography>
                        <Typography variant="body1" sx={{ cursor: 'pointer' }} onClick={handleSelfRegister}>
                            {selfRegisterButtonLabel || 'Self Register'}
                        </Typography>
                    </Box>
                )}

                {showContactSupport && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Typography variant="body1" sx={{ cursor: 'pointer' }} onClick={handleContactSupport}>
                            {contactSupportLabel || 'Contact Support'}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>{footer}</Box>

                {showCyberSecurityBadge && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <img
                            src={cyberSecurityBadge}
                            alt="Cyber Security Badge"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </Box>
                )}

                {errorDialog}
            </WorkflowCardBody>
        </WorkflowCard>
    );
};
