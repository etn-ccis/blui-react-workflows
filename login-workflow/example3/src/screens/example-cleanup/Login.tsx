import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';
import { LoginScreen, useSecurityActions, useAuthContext } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { routes } from '../../navigation/Routing';
const LinksWrapperStyles = {
    textAlign: 'center',
    pb: 4,
};
export const Login = (): JSX.Element => {
    const { setIsAuthenticated } = useApp();
    const auth = useAuthContext();
    const [debugMode, setDebugMode] = React.useState(false);
    return (

        <>
            <LoginScreen
                onLogin={(username, password): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                    setIsAuthenticated(true);
                    auth.navigate('guarded');
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
                    auth.navigate('forgot-password');
                }}
                onSelfRegister={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onSelfRegister');
                    auth.navigate('self-registration');
                }}
                onContactSupport={(): void => {
                    // eslint-disable-next-line no-console
                    console.log('onContactSupport');
                    auth.navigate('contact-support');
                }}
                projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
                header={
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Box>
                                {debugMode && <Typography variant={'h6'}>
                                    DEBUG MODE
                                </Typography>}
                            </Box>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                onClick={(): void => {
                                    setDebugMode(!debugMode)
                                }}
                            >
                                {`DEBUG`}
                            </Button>
                        </Box>
                        {
                            debugMode && <Box sx={LinksWrapperStyles}>
                                <Typography variant="body2">
                                    <Link to={`${routes.REGISTER_INVITE}`}>
                                        [Test Invite Register]
                                    </Link>
                                </Typography>
                                <Typography variant="body2">
                                    <Link to={`${routes.RESET_PASSWORD}`}>
                                        [Test Reset Password Email]
                                    </Link>
                                </Typography>
                            </Box>
                        }

                    </Box>
                }
            />
        </>
    );
};
