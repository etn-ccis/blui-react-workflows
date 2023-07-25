import React, { useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { AppContextProvider } from './contexts';
import { i18nAppInstance } from './contexts/i18nAppInstance';

export const App = (): JSX.Element => {
    const appLanguage = window.localStorage.getItem('language');
    const userIsAuthenticated = window.localStorage.getItem('userIsAuthenticated');
    const [isAuthenticated, setIsAuthenticated] = useState(userIsAuthenticated ? true : false);
    const [language, setLanguage] = useState(appLanguage || '');

    const setAppLanguage = useCallback(
        (lang: string) => {
            setLanguage(lang);
        },
        [language, setLanguage]
    );

    const setAppAuthenticated = useCallback(
        (isAppAuthenticated: boolean) => {
            setIsAuthenticated(isAppAuthenticated);
        },
        [isAuthenticated, setIsAuthenticated]
    );

    return (
        <AppContextProvider
            language={language}
            isAuthenticated={isAuthenticated}
            i18n={i18nAppInstance}
            setLanguage={setAppLanguage}
            setIsAuthenticated={setAppAuthenticated}
        >
            <BrowserRouter basename={'/'}>
                <SecurityContextProvider>
                    <AppRouter />
                </SecurityContextProvider>
            </BrowserRouter>
        </AppContextProvider>
    );
};
