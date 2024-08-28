import { useContext } from 'react';
import { OktaAuthContext } from './context';
import { OktaAuthContextProvider } from './provider';
import { OktaAuthContextProviderProps } from './types';

/**
 * Hook to get top level data in okta authentication workflow
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useOktaAuthContext = (): OktaAuthContextProviderProps => {
    const context = useContext(OktaAuthContext);
    if (context === null) {
        throw new Error('useOktaAuthContext must be used within OktaAuthContextProvider');
    }
    return context;
};

export type { OktaAuthContextProviderProps };

export { OktaAuthContext, OktaAuthContextProvider };
