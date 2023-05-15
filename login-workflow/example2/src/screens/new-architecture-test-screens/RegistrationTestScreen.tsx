import React from 'react';
import { i18nRegistrationInstance, RegistrationContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { I18nTestScreen } from './I18nTestScreen';
import Box from '@mui/material/Box';
import { EmptyState } from '@brightlayer-ui/react-components';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Event from '@mui/icons-material/Event';
import AppBar from '@mui/material/AppBar';

export const RegistrationTestScreen = (): JSX.Element => {
    const { language } = useAuth();
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Registration Test
                    </Typography>
                </Toolbar>
            </AppBar>
            <RegistrationContextProvider
                i18n={i18nRegistrationInstance}
                language={language}
                routeConfig={{}}
                navigate={navigate}
            >
                <Box sx={{ flex: '1 1 0px' }}>
                    <EmptyState
                        icon={<Event fontSize={'inherit'} />}
                        title={'Registration and Registration i18n Screen Placeholder'}
                        description={
                            'You should only be able to access this if you ARE NOT authenticated \n You should also be able to modify the language and see the 2 entries below change to the selected language'
                        }
                        actions={
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Box>
                                    <I18nTestScreen />
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
            </RegistrationContextProvider>
        </Box>
    );
};
