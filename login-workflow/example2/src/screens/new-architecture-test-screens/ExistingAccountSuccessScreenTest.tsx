import React, { PropsWithChildren } from 'react';
import { ExistingAccountSuccessScreen, RegistrationContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import { Box } from '@mui/material';
import { useApp } from '../../contexts/AppContextProvider';
import { routes } from '../../navigation/Routing';

export const ExistingAccountSuccessScreenTest: React.FC<PropsWithChildren> = () => {
    const { language } = useApp();
    const navigate = useNavigate();

    return (
        <Box sx={{ flex: '1 1 0px' }}>
            <RegistrationContextProvider
                language={language}
                routeConfig={routes}
                navigate={navigate}
                actions={ProjectRegistrationUIActions}
            >
                <ExistingAccountSuccessScreen />
            </RegistrationContextProvider>
        </Box>
    );
};
