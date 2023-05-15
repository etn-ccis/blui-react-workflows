import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Divider } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContextProvider';
import { I18nTestScreen } from './I18nTestScreen';
// eslint-disable-next-line arrow-body-style
export const GuardedScreen = (): JSX.Element => {
    const auth = useAuth();
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
                                    // eslint-disable-next-line no-console
                                    console.log('settingAuthenticated to false');
                                    auth.setIsAuthenticated(false);
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
                            <Divider sx={{ mt: 3, mb: 2 }} />
                            <I18nTestScreen />
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};
