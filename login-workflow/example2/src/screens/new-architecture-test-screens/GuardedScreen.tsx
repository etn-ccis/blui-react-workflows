import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContextProvider';
export const GuardedScreen = (): JSX.Element => {
    const app = useApp();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Guarded!!!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <EmptyState
                    icon={<Event fontSize={'inherit'} />}
                    title={'Guarded Screen Placeholder'}
                    description={'You should only be able to access this if you ARE authenticated'}
                    actions={
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ width: 200 }}
                                onClick={(): void => {
                                    app.setIsAuthenticated(false);
                                }}
                            >
                                Logout
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
                                onClick={(): void => navigate('/login')}
                            >
                                Go Login Route
                            </Button>
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};
