/**
 * @packageDocumentation
 * @module RegistrationContext
 */

import { createContext, useContext } from 'react';
import { RegistrationContextProviderProps } from './types';

export const RegistrationContext = createContext<RegistrationContextProviderProps | null>(null);

/**
 * Hook to get the data of each registration workflow screen
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useRegistrationContext = (): RegistrationContextProviderProps => {
    const context = useContext(RegistrationContext);
    if (context === null) {
        throw new Error('useRegistrationContext must be used within an RegistrationContextProvider');
    }
    return context;
};
