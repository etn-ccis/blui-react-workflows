import React from 'react';
import { Box, Button } from '@mui/material';
import { LoginScreen, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';

export const Login = (): JSX.Element => {
    const { language, setIsAuthenticated } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: '1 1 0px' }}>
                <AuthContextProvider
                    actions={ProjectAuthUIActions(securityContextActions)}
                    language={language}
                    navigate={navigate}
                    routeConfig={{}}
                >
                    <>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            onClick={(): void => navigate('/debug')}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                        >
                            {`DEBUG`}
                        </Button>
                        <LoginScreen
                            onLogin={(username, password): void => {
                                // eslint-disable-next-line no-console
                                console.log('onLogin', username, password);
                                setIsAuthenticated(true);
                                navigate('/guarded');
                            }}
                            usernameTextFieldProps={{
                                inputProps: {
                                    maxLength: 30,
                                },
                            }}
                            passwordTextFieldProps={{
                                required: true,
                            }}
                            onRememberMeChanged={(value: boolean): void => {
                                // eslint-disable-next-line no-console
                                console.log('onRememberMeChanged', value);
                            }}
                            // showRememberMe={false}
                            onForgotPassword={(): void => {
                                // eslint-disable-next-line no-console
                                console.log('onForgotPassword');
                                navigate('/forgot-password-full-screen');
                            }}
                            onSelfRegister={(): void => {
                                // eslint-disable-next-line no-console
                                console.log('onSelfRegister');
                                navigate('/create-account');
                            }}
                            onContactSupport={(): void => {
                                // eslint-disable-next-line no-console
                                console.log('onContactSupport');
                                navigate('/contact-support-full-screen');
                            }}
                            projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
                        />
                    </>
                </AuthContextProvider>
            </Box>
        </Box>
    );
};
