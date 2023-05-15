import { useContext } from 'react';
import { AuthContext } from './context';
import { AuthContextProviderProps, AuthUIActions } from './types';

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
