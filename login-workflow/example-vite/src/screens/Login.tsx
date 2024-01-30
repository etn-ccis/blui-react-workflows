import React from 'react';
import { LoginScreen } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';

export const Login = (): JSX.Element => (
    // Everything on the login screen should work out of the box without having to specify ANY overrides for props here
    <LoginScreen
        projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
        header={<DebugComponent />}
        errorDisplayConfig={{
            mode: 'message-box',
            messageBoxConfig: {
                dismissible: true,
                position: 'top',
            },
        }}
    />
);
