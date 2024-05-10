/**
 * @packageDocumentation
 * @module AuthContext
 */
import { createContext } from 'react';
import { AuthContextProviderProps } from './types';

/**
 * Auth Context is used to access context in the authentication workflow
 */
export const AuthContext = createContext<AuthContextProviderProps | null>(null);
