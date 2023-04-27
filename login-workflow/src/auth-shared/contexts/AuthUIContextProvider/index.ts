/**
 * The AuthUIContextProvider allows for application code to pass in middleware
 * actions that result from the Authentication and Registration user interface.
 * Often the actions will be the local storage and API calls satisfying
 * [[AuthUIActions]] and [[RegistrationUIActions]]. UI configuration properties
 * are also passed in.
 *
 * @packageDocumentation
 * @module AuthUIContextProvider
 * @preferred
 */

import { useContext } from 'react';
import { AuthUIContext } from './context';
import { AuthUIContextProvider } from './provider';
import {
    AuthUIContextProviderProps,
    RegistrationUIActions,
    AuthUIActions,
    CustomRegistrationForm,
    LoginErrorDisplayConfig,
} from './types';

/**
 * Allows for the module to grab the properties / actions passed in from the applications.
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useInjectedUIContext = (): AuthUIContextProviderProps => {
    const context = useContext(AuthUIContext);
    if (context === null) {
        throw new Error('useInjectedUIContext must be used within an AuthUIContextProvider');
    }
    return context;
};

/** @ignore */
export type {
    AuthUIContextProviderProps,
    RegistrationUIActions,
    AuthUIActions,
    CustomRegistrationForm,
    LoginErrorDisplayConfig,
};
/** @ignore */
export { AuthUIContextProvider };
