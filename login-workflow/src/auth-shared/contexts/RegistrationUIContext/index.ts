/**
 * RegistrationStateContext and RegistrationActionContext provide access to global state and actions for registration related information (load EULA, complete registration, etc.).
 *
 * @packageDocumentation
 * @module RegistrationUIContext
 * @internal
 * @preferred
 */

import { useContext } from 'react';
import { RegistrationStateContext, RegistrationActionContext } from './context';

export * from './types';
export * from './reducer';
import { RegistrationActionsCreator } from './actions';
import { RegistrationActions } from './dispatchActions';
import { RegistrationUIState } from './state';
import { RegistrationUIContextActions } from './types';

/**
 * Hook for using the global account state for account-related global [[RegistrationUIState]] state changes (i.e. loading EULA, registration via invite).
 *
 * @category Hooks
 */
export const useRegistrationUIState = (): RegistrationUIState => {
    const context = useContext(RegistrationStateContext);
    if (context === null) {
        throw new Error('useRegistrationUIState must be used within an RegistrationUIContext');
    }
    return context;
};

/**
 * Hook for using the global [[RegistrationUIActions]] actions (i.e. loadEULA, completeRegistration, etc.) which change the global [[RegistrationUIState]].
 *
 * @category Hooks
 */
export const useRegistrationUIActions = (): RegistrationUIContextActions => {
    const context = useContext(RegistrationActionContext);
    if (context === null) {
        throw new Error('useRegistrationUIActions must be used within an RegistrationUIContext');
    }
    return context;
};

export { RegistrationActionContext, RegistrationStateContext, RegistrationActionsCreator, RegistrationActions };
