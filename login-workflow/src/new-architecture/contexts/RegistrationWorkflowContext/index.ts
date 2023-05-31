import { useContext } from 'react';
import { RegistrationWorkflowContext } from './context';
import { RegistrationWorkflowContextProps } from './types';
import { RegistrationWorkflowContextProvider } from './provider';

/**
 * Hook to get the data of each registration workflow screen
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useRegistrationWorkflowContext = (): RegistrationWorkflowContextProps => {
    const context = useContext(RegistrationWorkflowContext);
    if (context === null) {
        throw new Error('useRegistrationWorkflowContext must be used within an RegistrationContextProvider');
    }
    return context;
};

export type { RegistrationWorkflowContextProps };

export { RegistrationWorkflowContextProvider };

export * from './types';
