/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import { createContext } from 'react';
import { AuthUIContextProviderProps } from './types';

/** @ignore */
export const AuthUIContext = createContext<AuthUIContextProviderProps | null>(null);
