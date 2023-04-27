/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { createContext } from 'react';
import { RegistrationUIState, initialRegistrationState } from './state';
import { RegistrationUIContextActions } from './types';

const RegistrationActionContext = createContext<RegistrationUIContextActions | null>(null);
const RegistrationStateContext = createContext<RegistrationUIState>(initialRegistrationState);
export { RegistrationStateContext, RegistrationActionContext };
