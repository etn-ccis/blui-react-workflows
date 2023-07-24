import { useContext } from 'react';
import { AppContext } from './context';
// import i18nAuthInstance from './i18nAuthInstance';
import { AppContextProvider } from './provider';
import { AppContextProviderProps } from './types';


export const useAppContext = (): AppContextProviderProps => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error('useAppContext must be used within AppContextProvider');
    }
    return context;
};

export type { AppContextProviderProps };

export { AppContext, AppContextProvider };
