/**
 * @packageDocumentation
 * @module AuthContext
 */
import { createContext } from 'react';
import { AuthContextProviderProps } from './types';

export const AuthContext = createContext<AuthContextProviderProps | null>(null);
