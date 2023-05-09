import { createContext } from 'react';
import { RegistrationWorkflowContextProps } from './types';

export const RegistrationWorkflowContext = createContext<RegistrationWorkflowContextProps | null>(null);
