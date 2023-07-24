import { i18n } from "i18next";

export type AppContextProviderProps = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    language: string;
    setLanguage: (language: string) => void;
    i18n?: i18n;
    user: string;
    setUser: (user: string) => void;
};

