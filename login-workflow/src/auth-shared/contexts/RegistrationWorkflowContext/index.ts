import { useContext } from 'react';
import { RegistrationWorkflowContext } from './context';

export const useRegistrationWorkflowContext = () => {
    const context = useContext(RegistrationWorkflowContext);
    if (context === null) {
        throw new Error('useRegistrationWorkflowContext must be used within an RegistrationContextProvider');
    }
    return context;
};
