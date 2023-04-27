/**
 * SecurityContextProvider provides a single source of state for the state of
 * user authentication. It is not meant to authenticate the user or hold
 * credential information. Its purpose is to control access to authenticated
 * or non-authenticated sections of the application (as well as change password
 * for a currently authenticated user).
 *
 * @packageDocumentation
 * @module SecurityContextProvider
 * @preferred
 */

/** @ignore */
export * from './SecurityContextProvider';
/** @ignore */
export type { SecurityContextActions } from './types';
