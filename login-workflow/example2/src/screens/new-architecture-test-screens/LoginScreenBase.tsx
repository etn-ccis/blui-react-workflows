import React from 'react';
import { Box } from '@mui/material';
import { LoginScreenBase } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const LoginScreenBaseTest = (): JSX.Element => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: '1 1 0px' }}>
            <LoginScreenBase
                usernameLabel="Email Address"
                usernameValidator={(username: string): string | boolean => {
                    if (!EMAIL_REGEX.test(username)) {
                        return 'Enter a valid email address';
                    }
                    return true;
                }}
                usernameTextFieldProps={{
                    inputProps: {
                        maxLength: 30,
                    },
                }}
                initialUsernameValue=""
                passwordLabel="Password"
                passwordValidator={(password: string): string | boolean => {
                    if (password.length < 2) {
                        return 'Password must be at least 2 characters';
                    }
                    return true;
                }}
                showRememberMe={true}
                rememberMeLabel="Remember Me"
                rememberMeInitialValue={true}
                onRememberMeChanged={(value: boolean): void => {
                    // eslint-disable-next-line no-console
                    console.log('onRememberMeChanged', value);
                }}
                loginButtonLabel="Log In"
                onLogin={(username, password): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                }}
                showForgotPassword={true}
                forgotPasswordLabel="Forgot your password?"
                onForgotPassword={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onForgotPassword');
                }}
                showSelfRegistration={true}
                selfRegisterButtonLabel="Register now!"
                selfRegisterInstructions="Need an account?"
                onSelfRegister={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onSelfRegister');
                }}
                showContactSupport={true}
                contactSupportLabel="Contact an Eaton Support Representative"
                onContactSupport={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onContactSupport');
                }}
                errorDisplayConfig={
                    {
                        // LoginErrorDisplayConfig
                        // mode?: 'dialog' | 'message-box' | 'both' | 'none';
                        // dismissible?: boolean;
                        // position?: 'top' | 'bottom';
                        // fontColor?: string;
                        // backgroundColor?: string;
                        // dialogErrorConfig?: {
                        // title?: string
                        // content?: string | JSX.Element
                        // acknowledgeButtonLabel?: string
                        // onAcknowledgeError?: () => void
                        // }
                    }
                }
                showCyberSecurityBadge={true}
                projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
                // header={
                //     <Typography variant={'h6'} color={'inherit'}>
                //         Login Screen
                //     </Typography>
                // }
                // footer={
                //     <Typography variant={'body2'} color={'inherit'}>
                //         Footer
                //     </Typography>
                // }
            />
        </Box>
    </Box>
);
