import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import './translations/i18n';

export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
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
    );
};
