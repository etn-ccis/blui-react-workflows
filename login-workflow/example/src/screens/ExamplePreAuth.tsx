import React from 'react';
import logo from './logo.svg';
import './Home.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSecurityState } from '@brightlayer-ui/react-auth-workflow';
import { Link } from 'react-router-dom';

export const ExamplePreAuth: React.FC<React.PropsWithChildren> = () => {
    const securityState = useSecurityState();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Welcome to the example pre-auth screen.</p>
                {!securityState.isAuthenticatedUser && (
                    <Typography variant={'h6'} sx={{ mb: 3 }}>
                        Try as you might, but you are not authenticated at this time and therefore cannot access any
                        guarded routes.
                    </Typography>
                )}
                {securityState.isAuthenticatedUser && (
                    <Typography variant={'h6'} sx={{ mb: 3 }}>
                        You are currently authenticated and should be able to access guarded routes.
                    </Typography>
                )}
                <Button variant={'contained'} component={Link} to={'/custom-login-route'}>
                    Navigate to Log In
                </Button>
                <Button variant={'contained'} component={Link} to={'/home'} sx={{ mt: 2 }}>
                    Navigate to Home (Guarded Route)
                </Button>
            </header>
        </div>
    );
};
