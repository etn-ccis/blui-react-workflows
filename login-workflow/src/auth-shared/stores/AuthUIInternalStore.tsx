/**
 * @packageDocumentation
 * @module Stores
 * @internal
 */

import React, { useReducer, useEffect } from 'react';
import { initialAccountUIState } from '../contexts/AccountUIContext/state';
import { defaultAccountUIReducer, AccountUIActionContext, AccountUIStateContext } from '../contexts/AccountUIContext';

import { RegistrationStateContext, RegistrationActionContext } from '../contexts/RegistrationUIContext/context';
import { registrationReducer, RegistrationActionsCreator } from '../contexts/RegistrationUIContext';
import { initialRegistrationState } from '../contexts/RegistrationUIContext/state';
import { useInjectedUIContext } from '../contexts/AuthUIContextProvider';
import { AccountActionsCreator } from '../contexts/AccountUIContext/actions';

export const AuthUIInternalStore: React.FC<React.PropsWithChildren> = (props) => {
    const injectedContext = useInjectedUIContext();

    // Setup the Authentication Items
    const [authState, authDispatch] = useReducer(defaultAccountUIReducer, initialAccountUIState);
    const authActions = AccountActionsCreator(injectedContext.authActions(), authDispatch)();

    // Setup the Registration Items
    const [registrationState, registrationDispatch] = useReducer(registrationReducer, initialRegistrationState);
    const registrationActions = RegistrationActionsCreator(
        injectedContext.registrationActions(),
        registrationDispatch
    )();

    // Middleware to dump state for debugging
    useEffect(() => {
        // console.log({ newAuthState: authState });
        // console.log({ newRegistrationState: registrationState });
    }, [registrationState, authState]);

    return (
        <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
            <RegistrationActionContext.Provider
                value={{ actions: registrationActions, dispatch: registrationDispatch }}
            >
                <AccountUIStateContext.Provider value={authState}>
                    <RegistrationStateContext.Provider value={registrationState}>
                        {props.children}
                    </RegistrationStateContext.Provider>
                </AccountUIStateContext.Provider>
            </RegistrationActionContext.Provider>
        </AccountUIActionContext.Provider>
    );
};
