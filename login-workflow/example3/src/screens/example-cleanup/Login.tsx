import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Typography } from '@mui/material';
import { LoginScreen, AuthContextProvider, useSecurityActions, useAuthContext } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { routes } from '../../navigation/Routing';
import { ForgotPasswordFullScreen } from '../new-architecture-test-screens';
const LinksWrapperStyles = {
    textAlign: 'center',
    pb: 4,
};
export const Login = (): JSX.Element => {
    const { language, setIsAuthenticated } = useApp();
    const navigate = useNavigate();
    const auth = useAuthContext();
    const securityContextActions = useSecurityActions();
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
                    console.log('navigate', navigate);
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
                                    <Link to={`${routes.FORGOT_PASSWORD}`}>
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
