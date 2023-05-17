/**
 * @packageDocumentation
 * @module AuthContext
 */
import { createContext } from 'react';
import { AuthContextProps } from './types';

export const AuthContext = createContext<AuthContextProps | null>(null);
