import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import './translations/i18n';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { i18nAppInstance } from './translations/i18n';
import { I18nextProvider } from 'react-i18next';

export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
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
