import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { ContactSupportScreen, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { routes } from '../../navigation/Routing';

export const ContactSupportScreenFullScreen = (): JSX.Element => {
    const securityContextActions = useSecurityActions();

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
                    language="en"
                    routeConfig={routes}
                    navigate={(): void => {}}
                    actions={ProjectAuthUIActions(securityContextActions)}
                >
                    <ContactSupportScreen />
                </AuthContextProvider>
            </Box>
        </Box>
    );
};
