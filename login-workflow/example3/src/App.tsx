/** eslint-ignore */
import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetCustomRoutes } from './navigation/Routing';
import { ProviderTest } from './screens';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
import './contexts/i18n';
export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                language,
                setLanguage,
            }}
        >
            {/* <RouterProvider router={createBrowserRouter(GetCustomRoutes(isAuthenticated), { basename: '/' })} /> */}
            <BrowserRouter basename={'/'}>
                <SecurityContextProvider>
                    <ProviderTest />
                </SecurityContextProvider>
            </BrowserRouter>
        </AppContext.Provider>
    );
};
