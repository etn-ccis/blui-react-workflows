import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { EulaScreenBase, useLanguageLocale } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';

// Constants
import { SAMPLE_EULA } from '../../constants/sampleEula';
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const EulaScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    const { t } = useLanguageLocale();

    const [eulaLoaded, setIsEulaLoaded] = useState(true);
    const [eulaContent, setEulaContent] = useState('');

    const loadEula = useCallback(async (): Promise<void> => {
        if (!eulaContent) {
            setEulaContent(t('blui:REGISTRATION.EULA.LOADING'));
            await sleep(800);
            setEulaContent(SAMPLE_EULA);
            setIsEulaLoaded(false);
        }
    }, [eulaContent, setEulaContent, t]);

    useEffect(() => {
        void loadEula();
    }, []);

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
                    WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                    eulaContent={eulaContent}
                    WorkflowCardBaseProps={{
                        loading: eulaLoaded,
                    }}
                    checkboxLabel={'I have read and agree to the Terms & Conditions'}
                    checkboxProps={{ disabled: false }}
                    initialCheckboxValue={false}
                    onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: true,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 0,
                        totalSteps: 6,
                    }}
                />
            </Box>
        </Box>
    );
};
