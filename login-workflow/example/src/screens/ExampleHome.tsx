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
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Colors from '@brightlayer-ui/colors';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import i18n from '../translations/i18n';

export const ExampleHome: React.FC<React.PropsWithChildren> = () => {
    const app = useApp();
    const supportedLanguages = ['en', 'fr', 'es', 'zh', 'pt'];
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
        app.onUserNotAuthenticated();
        navigate('/login');
    };

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        app.setLanguage(appLanguage);
        void i18n.changeLanguage(appLanguage);
    };

    return (
        <>
            <DrawerLayout
                drawer={
                    <Drawer open={open} width={332} variant={'persistent'}>
                        <DrawerHeader
                            title={`${t('DRAWER_MENU.TITLE')}`}
                            icon={<Menu />}
                            onClick={(): void => setOpen(!open)}
                        />
                        <DrawerBody>
                            <DrawerNavGroup>
                                <DrawerNavItem
                                    title={`${t('DRAWER_MENU.DASHBOARD')}`}
                                    icon={<Dashboard />}
                                    itemID="1"
                                />
                                <DrawerNavItem
                                    title={`${t('DRAWER_MENU.LOCATIONS')}`}
                                    icon={<Notifications />}
                                    itemID="2"
                                />
                            </DrawerNavGroup>
                        </DrawerBody>
                    </Drawer>
                }
            >
                <Box>
                    <AppBar position={'sticky'} color="primary">
                        <Toolbar sx={{ px: 2 }}>
                            <Typography variant="h6">{`${t('TOOLBAR_MENU.HOME_PAGE')}`}</Typography>
                            <Spacer />
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                        value={supportedLanguages.includes(app.language) ? app.language : 'en'}
                                        onChange={changeAppLanguage}
                                        variant={'standard'}
                                        sx={{
                                            mr: 2,
                                            backgroundColor: 'transparent',
                                            color: Colors.white[50],
                                            '& .MuiSelect-icon': {
                                                color: Colors.white[50],
                                            },
                                        }}
                                    >
                                        <MenuItem value={'en'}>English</MenuItem>
                                        <MenuItem value={'es'}>Spanish</MenuItem>
                                        <MenuItem value={'fr'}>French</MenuItem>
                                        <MenuItem value={'zh'}>Chinese</MenuItem>
                                        <MenuItem value={'pt'}>Portuguese</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <UserMenu
                                avatar={<Avatar>AV</Avatar>}
                                menuGroups={[
                                    {
                                        items: [
                                            {
                                                icon: <AccountBox />,
                                                title: `${t('USER_MENU.MY_ACCOUNT')}`,
                                                onClick: (): void => {},
                                            },
                                            {
                                                icon: <LockIcon />,
                                                title: `${t('USER_MENU.CHANGE_PASSWORD')}`,
                                                onClick: (): any => {
                                                    app.setShowChangePasswordDialog(true);
                                                },
                                            },
                                            {
                                                icon: <ExitToApp />,
                                                title: `${t('USER_MENU.LOG_OUT')}`,
                                                onClick: (): void => {
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
                        title={`${t('TOOLBAR_MENU.HOME_PAGE')}`}
                        description={`${t('PAGE_DETAILS.AUTHORISED_MESSAGE')}`}
                    />
                </Box>
            </DrawerLayout>
        </>
    );
};
