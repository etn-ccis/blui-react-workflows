import React, { useState } from 'react';
import {
    LoginScreen,
    AuthContextProvider,
    useAuthContext,
    useSecurityActions,
} from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { useApp } from '../contexts/AppContextProvider';
import { DebugComponent } from '../components/DebugComponent';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { REMEMBER_ME_DATA } from '../constants';

export const Login = (): JSX.Element => {
    const { setIsAuthenticated } = useApp();
    const auth = useAuthContext();
    const securityContextActions = useSecurityActions();

    const jsonRememberMe = window.localStorage.getItem(REMEMBER_ME_DATA) || '{}';
    const rememberMeData = JSON.parse(jsonRememberMe);

    const [rememberMe, setRememberMe] = useState(rememberMeData.rememberMe ? rememberMeData.rememberMe : false);
    const [rememberEmail, setRememberEmail] = useState(rememberMeData.user ? rememberMeData.user : '');

    return (
        <AuthContextProvider
            actions={ProjectAuthUIActions(securityContextActions)}
            language={auth.language}
            navigate={auth.navigate}
            routeConfig={{}}
            errorConfig={{
                mode: 'message-box',
                dismissible: true,
                position: 'top',
            }}
            rememberMeDetails={{ rememberMe: rememberMe, email: rememberEmail }}
        >
            <>
                <LoginScreen
                    onLogin={(username, password): void => {
                        // eslint-disable-next-line no-console
                        console.log('onLogin', username, password);
                        setIsAuthenticated(true);
                        setRememberEmail(username);
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
                        setRememberMe(value);
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
        </AuthContextProvider>
    );
};
