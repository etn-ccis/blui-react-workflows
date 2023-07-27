import { createContext, useContext } from 'react';

export type AppContextType = {
    isAuthenticated: boolean;
    onUserAuthenticated: (args: { email: string; userId: string; rememberMe: boolean }) => void;
    onUserNotAuthenticated: (clearRememberMe?: boolean, overrideRememberMeEmail?: string) => void;
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
