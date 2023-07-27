import React from 'react';
import { LoginScreen, useAuthContext } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';
import { useApp } from '../contexts/AppContextProvider';

export const Login = (): JSX.Element => {
    const auth = useAuthContext();
    const appActions = useApp();
    //const jsonRememberMe = window.localStorage.getItem(REMEMBER_ME_DATA) || '{}';
    //const rememberMeData = JSON.parse(jsonRememberMe);

    //const [rememberMe, setRememberMe] = useState(rememberMeData.rememberMe ? rememberMeData.rememberMe : false);
    //const [rememberEmail, setRememberEmail] = useState(rememberMeData.user ? rememberMeData.user : '');

    return (
        <>
            <LoginScreen
                onLogin={(username = '', password, rememberMe = false): void => {
                    // eslint-disable-next-line no-console
                    console.log('onLogin', username, password);
                    appActions.setLoginData({ email: username, rememberMe: rememberMe });
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
