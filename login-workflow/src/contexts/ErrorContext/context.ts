/**
 * @packageDocumentation
 * @module ErrorContext
 */
import { createContext } from 'react';
import { ErrorContextProviderProps } from './types';

/**
 * An object that is used for error handling within the application
 */
export const ErrorContext = createContext<ErrorContextProviderProps | null>(null);
