import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { CreateAccountScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';

export const CreateAccountScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Create Account Screen
                    </Typography>
                    <Spacer />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 200 }}
                        onClick={(): void => navigate('/login')}
                    >
                        Go Login Route
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <CreateAccountScreenBase
                    title={'Create an Account'}
                    instructions={
                        'To register for an Eaton account, enter the required information below. You will need to verify your email address to continue.'
                    }
                    initialValue={''}
                    emailLabel={'Email Address'}
                    showNext={true}
                    nextLabel="Next"
                    canGoNext={false}
                    showPrevious={true}
                    previousLabel="Back"
                    canGoPrevious={true}
                    currentStep={1}
                    totalSteps={6}
                />
            </Box>
        </Box>
    );
};
