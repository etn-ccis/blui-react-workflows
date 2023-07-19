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
import Menu from '@mui/icons-material/Menu';
import AccountBox from '@mui/icons-material/AccountBox';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Colors from '@brightlayer-ui/colors';
import { LanguageSelector } from '../components/LanguageSelector';

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
                        title={`${t('blui:DRAWER_MENU.TITLE')}`}
                        icon={<Menu />}
                        onClick={(): void => setOpen(!open)}
                    />
                    <DrawerBody>
                        <DrawerNavGroup>
                            <DrawerNavItem
                                title={`${t('blui:DRAWER_MENU.DASHBOARD')}`}
                                icon={<Dashboard />}
                                itemID="1"
                            />
                            <DrawerNavItem
                                title={`${t('blui:DRAWER_MENU.LOCATIONS')}`}
                                icon={<Notifications />}
                                itemID="2"
                            />
                        </DrawerNavGroup>
                    </DrawerBody>
                </Drawer>
            }
        >
            <Box>
                <AppBar color="primary">
                    <Toolbar sx={{ px: 2, minHeight: 'unset', height: '4rem' }}>
                        <Typography variant="h6">{`${t('blui:TOOLBAR_MENU.HOME_PAGE')}`}</Typography>
                        <Spacer />
                        <Box sx={{ py: 2 }}>
                            <LanguageSelector
                                variant="standard"
                                sx={{
                                    padding: '4px',
                                    minWidth: '160px',
                                    margin: '16px',
                                    backgroundColor: 'transparent',
                                    color: Colors.white[50],
                                    '& .MuiSelect-icon': {
                                        color: Colors.white[50],
                                    },
                                }}
                            />
                        </Box>
                        <UserMenu
                            onClick={(): void => setOpen(!open)}
                            avatar={<Avatar>AV</Avatar>}
                            menuGroups={[
                                {
                                    items: [
                                        {
                                            icon: <AccountBox />,
                                            title: `${t('blui:USER_MENU.MY_ACCOUNT')}`,
                                            onClick: (): void => {
                                                setOpen(false);
                                            },
                                        },
                                        {
                                            icon: <ExitToApp />,
                                            title: `${t('blui:USER_MENU.LOG_OUT')}`,
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
                    title={`${t('blui:TOOLBAR_MENU.HOME_PAGE')}`}
                    description={`${t('blui:PAGE_DETAILS.AUTHORISED_MESSAGE')}`}
                />
            </Box>
        </DrawerLayout>
    );
};