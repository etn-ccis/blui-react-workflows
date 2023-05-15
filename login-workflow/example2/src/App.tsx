import React, { useState } from 'react';
import { AuthContext } from './contexts/AuthContextProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetCustomRoutes } from './navigation/Routing';

export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                language,
                setLanguage,
            }}
        >
            <RouterProvider
                router={createBrowserRouter(GetCustomRoutes(isAuthenticated), { basename: '/test-custom-basename' })}
            />
        </AuthContext.Provider>
    );
};
