import React, { useState } from 'react';
import { AppContext } from './contexts/AppContextProvider';
import { BrowserRouter} from 'react-router-dom';
import { ProviderTest } from './screens';
import { SecurityContextProvider } from '@brightlayer-ui/react-auth-workflow';
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
            <BrowserRouter basename={'/'}>
                <SecurityContextProvider>
                    <ProviderTest isAuthenticated={isAuthenticated}/>
                </SecurityContextProvider>
            </BrowserRouter>
        </AppContext.Provider>
    );
};
