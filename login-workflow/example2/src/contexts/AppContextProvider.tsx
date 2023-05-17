import { createContext, useContext } from 'react';

type AppContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    language: string;
    setLanguage: (language: string) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error('useApp must be used within a AppContextProvider');
    }
    return context;
};
