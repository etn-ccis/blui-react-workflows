import React from 'react';
import { OktaRedirectLoginScreen } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';

export const OktaLogin = (): JSX.Element => (
    <OktaRedirectLoginScreen
        projectImage={<img src={EatonLogo} alt="logo" style={{ maxHeight: 80 }} />}
        header={<DebugComponent />}
    />
);
