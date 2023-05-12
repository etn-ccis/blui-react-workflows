import { useContext } from 'react';
import { AuthContext } from './context';
import { AuthContextProps, AuthUIActions } from './types';

/**
 * Hook to manage top level data in authentication workflow
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuthContext must be used within AuthContextProvider');
    }
    return context;
};

export type { AuthContextProps, AuthUIActions };
