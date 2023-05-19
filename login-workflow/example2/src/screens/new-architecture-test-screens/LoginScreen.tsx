import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContextProvider';
// eslint-disable-next-line arrow-body-style
export const LoginScreen = (): JSX.Element => {
    const { setIsAuthenticated } = useApp();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Login!!!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <EmptyState
                    icon={<Event fontSize={'inherit'} />}
                    title={'Login Screen Placeholder'}
                    description={'You should only be able to access this if you are NOT authenticated'}
                    actions={
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ width: 200 }}
                                onClick={(): void => setIsAuthenticated(true)}
                            >
                                Login
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/login-screen-base')}
                            >
                                Test Login Screen Base
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/registration-test')}
                            >
                                Test Registration
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/verify-code-test')}
                            >
                                Test Verify Code Screen
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/auth-test')}
                            >
                                Test Auth
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/contact-us')}
                            >
                                Contact Us
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ width: 200, ml: 2 }}
                                onClick={(): void => navigate('/guarded')}
                            >
                                Go Guarded Route
                            </Button>
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};
