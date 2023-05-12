import React from 'react';
import logo from './logo.svg';
import './Home.css';
import {
    useSecurityActions,
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    // WorkflowCardInstructions,
    WorkflowCardActions,
    RegistrationSuccessSubscreen,
} from '@brightlayer-ui/react-auth-workflow';
import { LocalStorage } from '../store/local-storage';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

export const ExampleHome: React.FC<React.PropsWithChildren> = () => {
    const securityHelper = useSecurityActions();

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <Button variant={'contained'} onClick={securityHelper.showChangePassword}>
                        Change Password
                    </Button>
                    <Button variant={'contained'} onClick={logOut} sx={{ mt: 2 }}>
                        Log Out
                    </Button>
                </header>
            </div>
            <WorkflowCard>
                <WorkflowCardHeader title="Account Created!" />
                {/* <WorkflowCardInstructions instructions="Please select a password. Make sure that your password meets the necessary complexity requirements outlined below." /> */}
                {/* <Divider /> */}
                <WorkflowCardBody>
                    <RegistrationSuccessSubscreen
                        firstName={'Manoj'}
                        lastName={'L'}
                        email={'manojlokesh@eaton.com'}
                        organization={'Eaton'}
                    />
                </WorkflowCardBody>
                <Divider />
                <WorkflowCardActions
                    canGoNext={true}
                    canGoPrevious={true}
                    showPrevious={true}
                    showNext={true}
                    previousLabel={'Back'}
                    nextLabel={'Continue'}
                    // fullWidthButton={true}
                />
            </WorkflowCard>
        </>
    );
};
