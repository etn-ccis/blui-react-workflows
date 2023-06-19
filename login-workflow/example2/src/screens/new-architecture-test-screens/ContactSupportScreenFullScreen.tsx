import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ContactSupportScreen, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { routes } from '../../navigation/Routing';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContextProvider';

export const ContactSupportScreenFullScreen = (): JSX.Element => {
    const securityContextActions = useSecurityActions();
    const { language } = useApp();
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
                <AuthContextProvider
                    language={language}
                    routeConfig={routes}
                    navigate={navigate}
                    actions={ProjectAuthUIActions(securityContextActions)}
                >
                    <ContactSupportScreen />
                </AuthContextProvider>
            </Box>
        </Box>
    );
};
