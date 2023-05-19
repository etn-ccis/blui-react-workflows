import React from 'react';
import { /*AppBar, Toolbar, Typography, Button,*/ Box } from '@mui/material';
// import { useNavigate } from 'react-router';
import { LoginScreenBase } from '@brightlayer-ui/react-auth-workflow';
// import { Spacer } from '@brightlayer-ui/react-components';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
export const LoginScreenBaseTest = (): JSX.Element => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Verify Code Screen
                    </Typography>
                    <Spacer />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 200 }}
                        onClick={(): void => navigate('/login')}
                    >
                        Go Login Route
                    </Button>
                </Toolbar>
            </AppBar> */}
        <Box sx={{ flex: '1 1 0px' }}>
            <LoginScreenBase
                usernameLabel="Email Address"
                usernameValidator={(username: string): string | boolean => {
                    if (username.length < 3) {
                        return 'Email Address must be at least 3 characters';
                    }
                    return true;
                }}
                initialUsernameValue=""
                passwordLabel="Password"
                passwordValidator={(password: string): string | boolean => {
                    if (password.length < 3) {
                        return 'Password must be at least 3 characters';
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
                loginButtonLabel="Login"
                onLogin={(username: string, password: string): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                }}
                showForgotPassword={true}
                forgotPasswordLabel="Forgot Your Password?"
                onForgotPassword={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onForgotPassword');
                }}
                showSelfRegistration={true}
                selfRegisterButtonLabel="Register Now!"
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
                errorDisplayConfig={{
                    // LoginErrorDisplayConfig
                    // mode?: 'dialog' | 'message-box' | 'both' | 'none';
                    // dismissible?: boolean;
                    // position?: 'top' | 'bottom';
                    // fontColor?: string;
                    // backgroundColor?: string;
                    mode: 'both',
                    dismissible: true,
                    position: 'top',
                    // fontColor: 'white',
                    // backgroundColor: 'red',
                    error: 'Invalid username or password.',
                }}
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
