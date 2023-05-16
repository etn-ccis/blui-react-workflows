import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetCustomRoutes } from './navigation/Routing';

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
            <RouterProvider router={createBrowserRouter(GetCustomRoutes(isAuthenticated), { basename: '/' })} />
        </AppContext.Provider>
    );
};
