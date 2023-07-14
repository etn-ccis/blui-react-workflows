import { useContext } from 'react';
import { ErrorContext } from './context';
import { ErrorContextProvider } from './provider';
import { ErrorContextProviderProps } from './types';

/**
 * Hook to get top level data in authentication workflow
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useErrorContext = (): ErrorContextProviderProps => {
    const context = useContext(ErrorContext);
    if (context === null) {
        throw new Error('useErrorContext must be used within ErrorContextProvider');
    }
    return context;
};

export type { ErrorContextProviderProps };

export { ErrorContext, ErrorContextProvider };
