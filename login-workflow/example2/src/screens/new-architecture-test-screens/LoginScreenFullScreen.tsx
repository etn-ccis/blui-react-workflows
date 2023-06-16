import React from 'react';
import { Box } from '@mui/material';
import { LoginScreen, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../../assets/images/eaton_stacked_logo.png';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';

export const LoginScreenFullScreenTest = (): JSX.Element => {
    const { language } = useApp();
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
                    <LoginScreen
                        onLogin={(username, password): void => {
                            // eslint-disable-next-line no-console
                            console.log('onLogin', username, password);
                        }}
                        // usernameTextFieldProps={{
                        //     inputProps: {
                        //         maxLength: 30,
                        //     },
                        // }}
                        // passwordTextFieldProps={{
                        //     required: true,
                        // }}
                        // onRememberMeChanged={(value: boolean): void => {
                        //     // eslint-disable-next-line no-console
                        //     // console.log('onRememberMeChanged', value);
                        // }}
                        // showRememberMe={false}
                        // onForgotPassword={(): void => {
                        //     // eslint-disable-next-line no-console
                        //     console.log('onForgotPassword');
                        // }}
                        // onSelfRegister={(): void => {
                        //     // eslint-disable-next-line no-console
                        //     console.log('onSelfRegister');
                        // }}
                        // onContactSupport={(): void => {
                        //     // eslint-disable-next-line no-console
                        //     console.log('onContactSupport');
                        // }}
                        projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
                    />
                </AuthContextProvider>
            </Box>
        </Box>
    );
};
