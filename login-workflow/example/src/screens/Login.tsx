import React, { useState } from 'react';
import {
    LoginScreen,
    AuthContextProvider,
    useAuthContext,
    useSecurityActions,
} from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { REMEMBER_ME_DATA } from '../constants';

export const Login = (): JSX.Element => {
    const auth = useAuthContext();
    const securityContextActions = useSecurityActions();

    const jsonRememberMe = window.localStorage.getItem(REMEMBER_ME_DATA) || '{}';
    const rememberMeData = JSON.parse(jsonRememberMe);

    const [rememberMe, setRememberMe] = useState(rememberMeData.rememberMe ? rememberMeData.rememberMe : false);
    const [rememberEmail, setRememberEmail] = useState(rememberMeData.user ? rememberMeData.user : '');

    return (
        <>
            <LoginScreen
                onLogin={(username, password): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
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
