import React from 'react';
import { AuthContextProvider, useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContextProvider';
import Box from '@mui/material/Box';
import { EmptyState } from '@brightlayer-ui/react-components';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Event from '@mui/icons-material/Event';
import AppBar from '@mui/material/AppBar';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { I18nAuthTestScreen } from './I18nAuthTestScreen';

export const AuthTestScreen = (): JSX.Element => {
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Auth Test
                    </Typography>
                </Toolbar>
            </AppBar>
            <AuthContextProvider
                language={language}
                routeConfig={{}}
                navigate={navigate}
                actions={ProjectAuthUIActions(securityContextActions)}
            >
                <Box sx={{ flex: '1 1 0px' }}>
                    <EmptyState
                        icon={<Event fontSize={'inherit'} />}
                        title={'Auth and Auth i18n Screen Placeholder'}
                        description={
                            'You should only be able to access this if you ARE NOT authenticated \n You should also be able to modify the language and see the 2 entries below change to the selected language'
                        }
                        actions={
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box>
                                    <I18nAuthTestScreen />
                                </Box>
                                <Button
                                    variant="contained"
                                    sx={{ width: 200, mt: 2 }}
                                    onClick={(): void => navigate('/login')}
                                >
                                    Go Login Route
                                </Button>
                            </Box>
                        }
                    />
                </Box>
            </AuthContextProvider>
        </Box>
    );
};
