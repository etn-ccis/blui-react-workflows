import React from 'react';
import logo from './logo.svg';
import './Home.css';
import { useSecurityActions } from '@brightlayer-ui/react-auth-shared';
import { LocalStorage } from '../store/local-storage';
import Button from '@mui/material/Button';

export const ExampleHome: React.FC = () => {
    const securityHelper = useSecurityActions();

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Button variant={'contained'} onClick={securityHelper.showChangePassword}>
                    Change Password
                </Button>
                <Button variant={'contained'} onClick={logOut} style={{ marginTop: 16 }}>
                    Log Out
                </Button>
            </header>
        </div>
    );
};
