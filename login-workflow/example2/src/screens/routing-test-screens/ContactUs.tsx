import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { EmptyState } from '@brightlayer-ui/react-components';
import Event from '@mui/icons-material/Event';
import { useNavigate } from 'react-router';
// eslint-disable-next-line arrow-body-style
export const ContactUs = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Contact-Us!!!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <EmptyState
                    icon={<Event fontSize={'inherit'} />}
                    title={'Contact Us Screen Placeholder'}
                    description={'You should be able to access this in any auth state'}
                    actions={
                        <Box>
                            <Button variant="contained" sx={{ width: 200 }} onClick={(): void => navigate('/')}>
                                Go to / route
                            </Button>
                        </Box>
                    }
                />
            </Box>
        </Box>
    );
};
