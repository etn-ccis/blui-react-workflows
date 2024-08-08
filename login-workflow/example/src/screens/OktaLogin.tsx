import React from 'react';
import { OktaLoginScreen } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';

export const OktaLogin = (): JSX.Element => (
    <OktaLoginScreen
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