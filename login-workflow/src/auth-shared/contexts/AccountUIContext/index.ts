/**
 * AccountUIStateContext and AccountUIActionContext provide access to global state and actions for account related information (login, forgot password, verify reset password code, etc.).
 *
 * @packageDocumentation
 * @module AccountUIContext
 * @preferred
 * @internal
 */

import { StateContext, ActionContext } from './context';
import { useContext } from 'react';
import { AccountUIContextActions } from './types';

export * from './types';
export * from './reducer';
import { AccountActions } from './dispatchActions';
import { AccountUIState } from './state';

/**
 * Hook for using the global account state for account-related global [[AccountUIState]] state changes (i.e. login, forgot password, set password, verify reset code).
 *
 * @category Hooks
 */
export const useAccountUIState = (): AccountUIState => {
    const context = useContext(StateContext);
    if (context === null) {
        throw new Error('useAccountUIState must be used within an AccountUIStateContext');
    }
    return context;
};

/**
 * Hook for using the global [[AccountUIActions]] actions (i.e. logIn, forgotPassword, etc.) which change the global [[AccountUIState]].
 *
 * @category Hooks
 */
export const useAccountUIActions = (): AccountUIContextActions => {
    const context = useContext(ActionContext);
    if (context === null) {
        throw new Error('useAccountUIActions must be used within an AccountUIActionContext');
    }
    return context;
};

export { StateContext as AccountUIStateContext, ActionContext as AccountUIActionContext, AccountActions };
