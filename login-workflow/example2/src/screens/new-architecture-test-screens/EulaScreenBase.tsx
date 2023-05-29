import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { EulaScreenBase, useLanguageLocale } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';

// Constants
import { SAMPLE_EULA } from '../../constants/sampleEula';
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function isRandomFailure(): boolean {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const randomResponseNumber = getRandomInt(100);
    return false; // randomResponseNumber < 90;
}
export const EulaScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    const { t } = useLanguageLocale();

    const [eulaLoaded, setIsEulaLoaded] = useState(true);
    const [eulaError, setIsEulaError] = useState(false);
    const [eulaContent, setEulaContent] = useState('');

    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        if (!eulaContent) {
            setEulaContent(t('blui:REGISTRATION.EULA.LOADING'));
            await sleep(800);
            if (isRandomFailure()) {
                setIsEulaError(true);
                throw new Error('Sorry, there was a problem sending your request.');
            }

            setEulaContent(SAMPLE_EULA);
            setIsEulaLoaded(false);
        }
    }, [eulaContent, setEulaContent, eulaError, t]);

    useEffect(() => {
        void loadAndCacheEula();
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
                        error: eulaError,
                    }}
                    checkboxLabel={'I have read and agree to the Terms & Conditions'}
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
