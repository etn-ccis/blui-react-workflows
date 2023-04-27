/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { createContext } from 'react';
import { AccountUIContextActions } from './types';
import { AccountUIState, initialAccountUIState } from './state';

const StateContext = createContext<AccountUIState>(initialAccountUIState);
const ActionContext = createContext<AccountUIContextActions | null>(null);

export { StateContext, ActionContext };
