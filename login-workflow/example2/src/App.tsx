import React, { useState } from 'react';
import { i18nRegistrationInstance, RegistrationContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { AuthContext } from './contexts/AuthContextProvider';
import { RouterProvider, useNavigate } from 'react-router-dom';
import { customRouter } from './navigation/Routing';

// eslint-disable-next-line arrow-body-style
export const App = (): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate();

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                language,
                setLanguage,
            }}
        >
            <RouterProvider router={customRouter}>
                <RegistrationContextProvider
                    i18n={i18nRegistrationInstance}
                    language={language}
                    routeConfig={{}}
                    navigate={navigate}
                ></RegistrationContextProvider>
            </RouterProvider>
        </AuthContext.Provider>
    );
};
