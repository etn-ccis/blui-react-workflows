import React from 'react';
import { useNavigate } from 'react-router';
import { ForgotPasswordScreen, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import Box from '@mui/material/Box';
import { useApp } from '../../contexts/AppContextProvider';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { routes } from '../../navigation/Routing';

export const ForgotPasswordScreenTest = (): JSX.Element => {
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    return (
        <Box sx={{ flex: '1 1 0px' }}>
            <AuthContextProvider
                language={language}
                routeConfig={routes}
                navigate={navigate}
                actions={ProjectAuthUIActions(securityContextActions)}
            >
                <ForgotPasswordScreen />
            </AuthContextProvider>
        </Box>
    );
};
