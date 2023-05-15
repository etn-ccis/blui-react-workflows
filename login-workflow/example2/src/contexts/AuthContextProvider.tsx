import { createContext, useContext } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    language: string;
    setLanguage: (language: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within a AuthContextProvider');
    }
    return context;
};
