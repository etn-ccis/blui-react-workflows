import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ContactScreenBase } from '@brightlayer-ui/react-auth-workflow';
import { ChatBubbleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router';
export const ContactScreenBaseTest = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Contact Us
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <ContactScreenBase
                    WorkflowCardHeaderProps={{ title: 'Contact Us' }}
                    icon={<ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />}
                    emailSupportTitle="General Questions"
                    // emailSupportContent={(email): string => `For questions, feedback, or support please email us at ${email}.`}
                    phoneSupportTitle="Emergency Support"
                    // phoneSupportContent={(phone): string => `For technical support, please call ${phone}.`}
                    contactEmail="something@email.com"
                    contactPhone="1-800-123-4567"
                    dismissButtonLabel="Okay"
                    WorkflowCardActionsProps={{
                        nextLabel: 'Okay',
                        showNext: true,
                        canGoNext: true,
                        onNext: (): void => navigate('/login'),
                        fullWidthButton: true,
                    }}
                />
            </Box>
        </Box>
    );
};
