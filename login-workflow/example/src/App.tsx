import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { I18nextProvider } from 'react-i18next';
import { i18nAppInstance } from './translations/i18n';
import { LocalStorage } from './store/local-storage';
import { CircularProgress } from '@mui/material';

export const App = (): JSX.Element => {
    const appLanguage = window.localStorage.getItem('language');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState(appLanguage || 'en');
    const [loginData, setLoginData] = useState<AppContextType['loginData']>({
        email: '',
        rememberMe: false,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const rememberMeDetails = async (): Promise<void> => {
            try {
                const userList = await LocalStorage.readAuthData();
                setLoginData({ email: userList.rememberMeData.user, rememberMe: userList.rememberMeData.rememberMe });
                setIsAuthenticated(userList.userId ? true : false);
            } catch (e) {
                // handle any error state, rejected promises, etc..
            } finally {
                setIsLoading(false);
            }
        };
        // eslint-disable-next-line
        rememberMeDetails();
        void i18nAppInstance.changeLanguage(language);
    }, []);

    return isLoading ? (
        <CircularProgress size={70} variant={'indeterminate'} />
    ) : (
        <I18nextProvider i18n={i18nAppInstance} defaultNS={'blui'}>
            <AppContext.Provider
                value={{
                    isAuthenticated,
                    onUserAuthenticated: (userData): void => {
                        setIsAuthenticated(true);
                        setLoginData(userData);
                        // eslint-disable-next-line no-console
                        console.log(userData);
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
