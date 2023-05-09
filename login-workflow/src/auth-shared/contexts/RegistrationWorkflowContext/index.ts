import { useContext } from 'react';
import { RegistrationWorkflowContext } from './context';
import { RegistrationWorkflowContextProviderProps } from './types';

/**
 * Hook to get the data of each registration workflow screen
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useRegistrationWorkflowContext = (): RegistrationWorkflowContextProviderProps => {
    const context = useContext(RegistrationWorkflowContext);
    if (context === null) {
        throw new Error('useRegistrationWorkflowContext must be used within an RegistrationContextProvider');
    }
    return context;
};
