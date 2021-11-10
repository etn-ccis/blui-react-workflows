import React from 'react';
import logo from './logo.svg';
import './Home.css';
import { Button, Typography } from '@material-ui/core';
import { useSecurityState } from '@brightlayer-ui/react-auth-shared';
import { Link } from 'react-router-dom';

export const ExamplePreAuth: React.FC = () => {
    const securityState = useSecurityState();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome to the example pre-auth screen.</p>
                {!securityState.isAuthenticatedUser && (
                    <Typography variant={'h6'} style={{ marginBottom: 24 }}>
                        Try as you might, but you are not authenticated at this time and therefore cannot access any
                        guarded routes.
                    </Typography>
                )}
                {securityState.isAuthenticatedUser && (
                    <Typography variant={'h6'} style={{ marginBottom: 24 }}>
                        You are currently authenticated and should be able to access guarded routes.
                    </Typography>
                )}
                <Button variant={'contained'} component={Link} to={'/custom-login-route'}>
                    Navigate to Log In
                </Button>
                <Button variant={'contained'} component={Link} to={'/home'} style={{ marginTop: 16 }}>
                    Navigate to Home (Guarded Route)
                </Button>
            </header>
        </div>
    );
};
