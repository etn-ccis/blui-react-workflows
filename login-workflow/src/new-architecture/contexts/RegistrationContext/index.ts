import { useContext } from 'react';
import { RegistrationContext } from './context';
import { RegistrationContextProviderProps } from './types';
import { RegistrationContextProvider } from './provider';

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
        throw new Error('useRegistrationWorkflowContext must be used within an RegistrationContextProvider');
    }
    return context;
};

export type { RegistrationContextProviderProps };

export { RegistrationContextProvider };
