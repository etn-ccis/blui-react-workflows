import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { VerifyCodeScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { Spacer } from '@brightlayer-ui/react-components';
export const VerifyCodeScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Verify Code Screen
                    </Typography>
                    <Spacer/>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 200, mr: 2 }}
                        onClick={(): void => navigate('/login')}
                    >
                        Go Login Route
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <VerifyCodeScreenBase
                title={'Verify Email'} 
                instructions={'A verification code has been sent to the email address you provided. Click the link or enter the code below to continue. This code is valid for 30 minutes.'}
                codeValidator={
                    (code: string): boolean | string => {
                        if (code?.length > 2) {
                            return true;
                        } return 'Code must be at least 3 characters';
                    }
                }
                initialValue={''}
                verifyCodeInputLabel={'Verification Code'}
                resendLabel='Send Again'
                //eslint-disable-next-line
                onResend={():void=> console.log('resending verification code...')}
                resendInstructions={'Didnt receive email?'}
                showNext={true}
                nextLabel='Next'
                canGoNext={false}
                showPrevious={true}
                previousLabel='Back'
                canGoPrevious={true}
                currentStep={2}
                totalSteps={6}

                />
            </Box>
        </Box>
    );
};