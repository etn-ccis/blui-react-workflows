/**
 * @packageDocumentation
 * @module SecurityContextProvider
 */

import React from 'react';
import { SecurityContextState, SecurityContextActions } from './types';
import { reducer } from './reducer';

/** @ignore */
const StateContext = React.createContext<SecurityContextState | null>(null);
/** @ignore */
const DispatchContext = React.createContext<SecurityContextActions | null>(null);

/**
 * A hook to get the security state (authenticated / not authenticated).
 *
 * NOTE: Must be used inside of a [[SecurityContextProvider]].
 * @category Hooks
 */
const useSecurityState = (): SecurityContextState => {
    const context = React.useContext(StateContext);
    if (context === null) {
        throw new Error('useSecurityState must be used within an SecurityContextProvider');
    }
    return context;
};

/**
 * A hook to get the security actions (on authenticated / on not authenticated).
 *
 * NOTE: Must be used inside of a [[SecurityContextProvider]].
 * @category Hooks
 */
const useSecurityActions = (): SecurityContextActions => {
    const context = React.useContext(DispatchContext);
    if (context === null) {
        throw new Error('useSecurityActions must be used within an SecurityContextProvider');
    }
    return context;
};

/**
 *  Provides a wrapper for the security state and security actions.
 *
 *  @public
 *  @category Component
 */
const SecurityContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const initialContextState: SecurityContextState = {
        userId: undefined,
        email: undefined,
        rememberMeDetails: {
            email: undefined,
            rememberMe: undefined,
        },
        isAuthenticatedUser: false,
        isLoading: true,
        isSignOut: false,
        isShowingChangePassword: false,
    };

    const [state, dispatch] = React.useReducer(reducer, initialContextState);

    // Function will not change for children (dispatch does not need to be a dependency)
    const onUserNotAuthenticated = React.useCallback((clearRememberMe = false, overrideRememberMeEmail?: string) => {
        dispatch({
            type: 'userNotAuthenticated',
            payload: { clearRememberMe: clearRememberMe, overrideRememberMeEmail: overrideRememberMeEmail },
        });
    }, []);

    const showChangePassword = React.useCallback((): void => {
        dispatch({
            type: 'showChangePassword',
        });
    }, []);

    const hideChangePassword = React.useCallback((): void => {
        dispatch({
            type: 'hideChangePassword',
        });
    }, []);

    // Function will not change for children (dispatch does not need to be a dependency)
    const onUserAuthenticated = React.useCallback(
        (onUserAuthenticatedArgs: { email: string; userId: string; rememberMe: boolean }) => {
            dispatch({
                type: 'userAuthenticated',
                payload: onUserAuthenticatedArgs,
            });
        },
        []
    );

    // Context value will not change unless a sub function is changed
    const memoizedAuthHelper = React.useMemo(() => {
        const authHelper: SecurityContextActions = {
            onUserAuthenticated,
            onUserNotAuthenticated,
            showChangePassword,
            hideChangePassword,
        };
        return authHelper;
    }, [onUserAuthenticated, onUserNotAuthenticated, showChangePassword, hideChangePassword]);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={memoizedAuthHelper}>{props.children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export { SecurityContextProvider, DispatchContext as SecurityActionContext, useSecurityState, useSecurityActions };
