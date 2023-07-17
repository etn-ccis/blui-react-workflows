import React, { useState } from 'react';
import { LocalStorage } from '../store/local-storage';
import { useApp } from '../contexts/AppContextProvider';
import {
    DrawerLayout,
    Drawer,
    DrawerBody,
    DrawerNavGroup,
    DrawerNavItem,
    DrawerHeader,
    Spacer,
    UserMenu,
    EmptyState,
} from '@brightlayer-ui/react-components';
import Box from '@mui/material/Box';
import Event from '@mui/icons-material/Event';
import Dashboard from '@mui/icons-material/Dashboard';
import Notifications from '@mui/icons-material/Notifications';
import Gavel from '@mui/icons-material/Gavel';
import MenuBook from '@mui/icons-material/MenuBook';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const ExampleHome: React.FC<React.PropsWithChildren> = () => {
    const app = useApp();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const containerStyles = {
        width: '100%',
        height: `calc(100vh - ${theme.spacing(8)})`,
        display: 'flex',
        padding: 0,
        overflow: 'auto',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            height: `calc(100vh - ${theme.spacing(7)})`,
        },
    };

    const emptyStateContainerStyles = {
        margin: 'auto',
        display: 'flex',
        zIndex: 4,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        app.setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <DrawerLayout
            drawer={
                <Drawer open={true} width={332} variant={'persistent'}>
                    <DrawerHeader
                        title={`${t('Blui:TITLE')}`}
                        icon={<MenuBook />}
                        onClick={(): void => setOpen(!open)}
                    />
                    <DrawerBody>
                        <DrawerNavGroup>
                            <DrawerNavItem title={`${t('Blui:DASHBOARD')}`} icon={<Dashboard />} itemID="1" />
                            <DrawerNavItem title={`${t('Blui:LOCATIONS')}`} icon={<Notifications />} itemID="2" />
                            <DrawerNavItem title={`${t('Blui:LEGAL_MENU')}`} icon={<Gavel />} itemID="3" />
                        </DrawerNavGroup>
                    </DrawerBody>
                </Drawer>
            }
        >
            <Box>
                <AppBar color="primary">
                    <Toolbar sx={{ px: 2, minHeight: 'unset', height: '4rem' }}>
                        <Typography variant="h6">{`${t('Blui:HOMEPAGE')}`}</Typography>
                        <Spacer />
                        <UserMenu
                            onClick={(): void => setOpen(!open)}
                            avatar={<Avatar>AV</Avatar>}
                            menuGroups={[
                                {
                                    items: [
                                        {
                                            title: `${t('Blui:MY_ACCOUNT')}`,
                                            onClick: (): void => {
                                                setOpen(false);
                                            },
                                        },
                                        {
                                            title: `${t('Blui:LOG_OUT')}`,
                                            onClick: (): void => {
                                                setOpen(false);
                                                logOut();
                                            },
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={containerStyles}>
                <EmptyState
                    sx={emptyStateContainerStyles}
                    icon={<Event fontSize={'inherit'} />}
                    title={`${t('Blui:HOMEPAGE')}`}
                    description={`${t('Blui:AUTHORISED_MESSAGE')}`}
                />
            </Box>
        </DrawerLayout>
    );
};
