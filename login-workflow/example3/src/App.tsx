import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { AppContextProvider } from './contexts';
import { i18nAppInstance } from './contexts/i18nAppInstance';
import { LocalStorage } from './store/local-storage';

export const App = (): JSX.Element => {
    const lang = window.localStorage.getItem('language');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState(lang || '');
    const [user, setUser] = useState('');

    const setAppLanguage = useCallback(
        (lang: string) => {
            setLanguage(lang)
        },
        [language, setLanguage]
    );

    const setAppAuthenticated = useCallback(
        (isAppAuthenticated: boolean) => {
            setIsAuthenticated(isAppAuthenticated)
        },
        [isAuthenticated, setIsAuthenticated]
    );

    const setAppUser = useCallback(
        (user1: string) => {
            setUser(user1)
        },
        [user, setUser]
    );

    const checkInitialData = useCallback(
        async (): Promise<void> => {
            try {
                const data = await LocalStorage.readAuthData();
                if (data !== null) { 
                    setUser(data.userId as string);
                    data.userId;
                }

            } catch (e) {
                console.error('not able to retrieve local storage data ... ')
            }
        },
        [user, isAuthenticated, setUser]
    );

    useEffect(() => {
        void checkInitialData();
        setUser(user);
        console.log('dsjdhsjhdj')
        console.log('lang', language)
    }, [isAuthenticated, user, language]);

    return (
        <AppContextProvider
            language={language}
            isAuthenticated={isAuthenticated}
            i18n={i18nAppInstance}
            setLanguage={setAppLanguage}
            setIsAuthenticated={setAppAuthenticated}
            user={user}
            setUser={setAppUser}
        >
            <BrowserRouter basename={'/'}>
                <SecurityContextProvider>
                    <AppRouter />
                </SecurityContextProvider>
            </BrowserRouter>
        </AppContextProvider>
    );
};
