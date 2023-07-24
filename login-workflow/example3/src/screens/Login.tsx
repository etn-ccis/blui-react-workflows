import React from 'react';
import { LoginScreen, useAuthContext } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';
import { useAppContext } from '../contexts';

export const Login = (): JSX.Element => {
    const app = useAppContext();
    const auth = useAuthContext();

    return (
        <>
            <LoginScreen
                onLogin={(username, password): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                    app.setIsAuthenticated(true);
                    app.setUser(username as string);
                    auth.navigate('homepage');
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
                header={<DebugComponent />}
            />
        </>
    );
};
