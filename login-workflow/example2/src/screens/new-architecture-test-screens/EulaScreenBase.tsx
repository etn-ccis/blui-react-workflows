import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { EulaScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';
// Constants
import { SAMPLE_EULA } from '../../constants/sampleEula';
export const EulaScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Eula Screen
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
                <EulaScreenBase
                    title={'License Agreement'}
                    eulaContent={SAMPLE_EULA}
                    checkboxLabel={'I have read and agree to the Terms & Conditions'}
                    initialCheckboxValue={false}
                    onEulaAcceptedChange={(accepted: boolean): boolean  => accepted}
                    showNext={true}
                    nextLabel="Next"
                    canGoNext={false}
                    showPrevious={true}
                    previousLabel="Back"
                    canGoPrevious={true}
                    currentStep={0}
                    totalSteps={6}
                />
            </Box>
        </Box>
    );
};
