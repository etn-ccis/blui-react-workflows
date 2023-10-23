import React from 'react';
import { LoginScreen } from '@brightlayer-ui/react-auth-workflow';
import EatonSeedLogo from '../assets/images/seed_logo.png';
import { BLCLogin } from '@brightlayer-ui/derms-blcloud-seedui';

export const Login = (): JSX.Element => (
    // Everything on the login screen should work out of the box without having to specify ANY overrides for props here
    <LoginScreen
        projectImage={<img src={EatonSeedLogo} alt="logo" style={{ maxHeight: 80 }} />}
        // header={<DebugComponent />}
        errorDisplayConfig={{
            mode: 'message-box',
            messageBoxConfig: {
                dismissible: true,
                position: 'top',
            },
        }}
        showContactSupport={false}
        showForgotPassword={false}
        // Do we want to do this here, or do we need to write our own LoginScreen component using the base screen so that we can customize the onLogin function?
        // onLogin={BLCLogin}
    />
);
