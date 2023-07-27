import React, { useCallback, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { I18nextProvider } from 'react-i18next';
import { i18nAppInstance } from './translations/i18n';
import { LocalStorage } from './store/local-storage';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const App = (): JSX.Element => {
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

    const appLanguage = window.localStorage.getItem('language');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState(appLanguage || 'en');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await LocalStorage.readAuthData();
            setIsAuthenticated(data.userId !== null ? true : false);
        } catch (e) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchData();
        void i18nAppInstance.changeLanguage(language);
    }, [fetchData, language]);

    return isLoading ? (
        <Box sx={containerStyles}>
            <CircularProgress sx={emptyStateContainerStyles} size={70} variant={'indeterminate'} />
        </Box>
    ) : (
        <I18nextProvider i18n={i18nAppInstance} defaultNS={'blui'}>
            <AppContext.Provider
                value={{
                    isAuthenticated,
                    onUserAuthenticated: (userData): void => {
                        setIsAuthenticated(true);
                        // eslint-disable-next-line no-console
                        console.log(userData);
                    },
                    onUserNotAuthenticated: (userData): void => {
                        setIsAuthenticated(false);
                        // eslint-disable-next-line no-console
                        console.log(userData);
                    },
                    language,
                    setLanguage,
                }}
            >
                <BrowserRouter basename={'/'}>
                    <AppRouter />
                </BrowserRouter>
            </AppContext.Provider>
        </I18nextProvider>
    );
};
