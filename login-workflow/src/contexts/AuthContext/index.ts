import { useContext } from 'react';
import { AuthContext } from './context';
import i18nAuthInstance from './i18nAuthInstance';
import { AuthContextProvider } from './provider';
import { AuthContextProviderProps, AuthUIActions } from './types';
import { AuthDictionaries } from './AuthDictionaries';

/**
 * Hook to get top level data in authentication workflow
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useAuthContext = (): AuthContextProviderProps => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuthContext must be used within AuthContextProvider');
    }
    return context;
};

export type { AuthContextProviderProps, AuthUIActions };

export { AuthContext, AuthContextProvider, i18nAuthInstance, AuthDictionaries };
