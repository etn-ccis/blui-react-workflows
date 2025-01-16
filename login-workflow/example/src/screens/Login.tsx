import React from 'react';
import { LoginScreen } from '@brightlayer-ui/react-auth-workflow';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';
import { DebugComponent } from '../components/DebugComponent';
import Box from '@mui/material/Box';
import Can from '../components/Can';

export const Login = (): JSX.Element => (
    <>
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
    <Can do="manage" on="Todo">
        <Box>
            Test
        </Box>
    </Can>
    </>
);
