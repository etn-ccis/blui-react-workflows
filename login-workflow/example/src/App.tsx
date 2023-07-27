import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { I18nextProvider } from 'react-i18next';
import { i18nAppInstance } from './translations/i18n';
import { LocalStorage } from './store/local-storage';
import { Box, CircularProgress, SxProps, Theme } from '@mui/material';

const containerStyles: SxProps<Theme> = {
    width: '100%',
    height: (t) => ({ xs: `calc(100vh - ${t.spacing(7)})`, md: `calc(100vh - ${t.spacing(8)})` }),
    display: 'flex',
    padding: 0,
    overflow: 'auto',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const emptyStateContainerStyles = {
    margin: 'auto',
    display: 'flex',
    zIndex: 4,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
};

export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState(window.localStorage.getItem('language') ?? 'en');
    const [loginData, setLoginData] = useState<AppContextType['loginData']>({
        email: '',
        rememberMe: false,
    });

    const [isLoading, setIsLoading] = useState(true);

    // handle language change
    useEffect(() => {
        void i18nAppInstance.changeLanguage(language);
    }, [language]);

    // handle initialization of auth data on first load
    useEffect(() => {
        const initialize = async (): Promise<void> => {
            try {
                const userData = await LocalStorage.readAuthData();
                setLoginData({ email: userData.rememberMeData.user, rememberMe: userData.rememberMeData.rememberMe });
                setIsAuthenticated(Boolean(userData.userId));
            } catch (e) {
                // handle any error state, rejected promises, etc..
            } finally {
                setIsLoading(false);
            }
        };
        // eslint-disable-next-line
        initialize();
    }, []);

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
                        setLoginData(userData);
                    },
                    onUserNotAuthenticated: (userData): void => {
                        setIsAuthenticated(false);
                        // eslint-disable-next-line no-console
                        console.log(userData);
                    },
                    loginData,
                    setLoginData,
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
