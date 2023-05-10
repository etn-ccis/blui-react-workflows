/**
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */

import { createContext } from 'react';
import { RegistrationWorkflowContextProviderProps } from './types';

export const RegistrationWorkflowContext = createContext<RegistrationWorkflowContextProviderProps | null>(null);
