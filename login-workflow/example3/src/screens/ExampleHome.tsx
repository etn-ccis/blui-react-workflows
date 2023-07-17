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
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import * as Colors from '@brightlayer-ui/colors';

export const ExampleHome: React.FC<React.PropsWithChildren> = () => {
    const app = useApp();
    const [selectedLanguage, setSelectedLanguage] = useState(app.language);
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

    const changeAppLanguage = (event: SelectChangeEvent): void => {
        const appLanguage = event.target.value;
        setSelectedLanguage(appLanguage);
        app.setLanguage(appLanguage);
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
                    <DrawerHeader title={`${t('Blui:TITLE')}`} icon={<Menu />} onClick={(): void => setOpen(!open)} />
                    <DrawerBody>
                        <DrawerNavGroup>
                            <DrawerNavItem title={`${t('Blui:DASHBOARD')}`} icon={<Dashboard />} itemID="1" />
                            <DrawerNavItem title={`${t('Blui:LOCATIONS')}`} icon={<Notifications />} itemID="2" />
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
                        <Box sx={{ py: 2 }}>
                            <FormControl fullWidth>
                                <Select
                                    sx={{
                                        padding: '4px',
                                        minWidth: '160px',
                                        margin: '0 16px',
                                        backgroundColor: 'transparent',
                                        color: Colors.white[50],
                                        '& .MuiSelect-icon': {
                                            color: Colors.white[50],
                                        },
                                    }}
                                    labelId="language-select-label"
                                    id="language-select"
                                    value={selectedLanguage}
                                    label="Language"
                                    variant="standard"
                                    onChange={changeAppLanguage}
                                >
                                    <MenuItem value={'en'}>English</MenuItem>
                                    <MenuItem value={'es'}>Spanish</MenuItem>
                                    <MenuItem value={'fr'}>French</MenuItem>
                                    <MenuItem value={'zh'}>Chinese</MenuItem>
                                    <MenuItem value={'pt'}>Portugese</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <UserMenu
                            onClick={(): void => setOpen(!open)}
                            avatar={<Avatar>AV</Avatar>}
                            menuGroups={[
                                {
                                    items: [
                                        {
                                            icon: <AccountBox />,
                                            title: `${t('Blui:MY_ACCOUNT')}`,
                                            onClick: (): void => {
                                                setOpen(false);
                                            },
                                        },
                                        {
                                            icon: <ExitToApp />,
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
