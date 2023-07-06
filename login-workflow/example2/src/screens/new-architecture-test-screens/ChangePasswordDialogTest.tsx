import React, { PropsWithChildren } from 'react';
import { ChangePasswordDialog, AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { Box } from '@mui/material';
import { useApp } from '../../contexts/AppContextProvider';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { routes } from '../../navigation/Routing';
import { useNavigate } from 'react-router';

export const ChangePasswordDialogTest: React.FC<PropsWithChildren> = () => {
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
                <ChangePasswordDialog open={true} />
            </AuthContextProvider>
        </Box>
    );
};
