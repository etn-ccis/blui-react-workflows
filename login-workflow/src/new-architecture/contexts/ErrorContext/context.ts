/**
 * @packageDocumentation
 * @module ErrorContext
 */
import { createContext } from 'react';
import { ErrorContextProviderProps } from './types';

export const ErrorContext = createContext<ErrorContextProviderProps | null>(null);
