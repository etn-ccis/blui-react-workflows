import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './screens';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
import './translations/i18n';

export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('es');

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                language,
                setLanguage,
            }}
        >
            <BrowserRouter basename={'/'}>
                <SecurityContextProvider>
                    <AppRouter />
                </SecurityContextProvider>
            </BrowserRouter>
        </AppContext.Provider>
    );
};
