/**
 * @packageDocumentation
 * @module OktaAuthContext
 */
import { createContext } from 'react';
import { OktaAuthContextProviderProps } from './types';

/**
 * Okta Auth Context is used to access context in the okta authentication workflow
 */
export const OktaAuthContext = createContext<OktaAuthContextProviderProps | null>(null);
