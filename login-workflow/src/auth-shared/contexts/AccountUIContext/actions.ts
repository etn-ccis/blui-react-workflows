/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { AccountActions as DispatchActions } from './dispatchActions';
import { AccountUIActions } from './types';

type AccountUIActionsFunction = () => AccountUIActions;
type AccountUIActionsCreator = (
    injectedActions: AccountUIActions,
    dispatch: React.Dispatch<DispatchActions>
) => AccountUIActionsFunction;

/**
 * Implementation of actions for altering the global [[AccountUIState]] via [[AuthUIActions]] calls.
 * Uses actions injected into the app to make network calls, and then updates the global state accordingly
 * using by dispatching [[AccountActions]] to the [[defaultAccountUIReducer]].
 *
 * @param injectedActions Implementation of network activities.
 * @param dispatch For updating reducer upon completion of network activities.
 */
export const AccountActionsCreator: AccountUIActionsCreator = (injectedActions, dispatch) => (): AccountUIActions => ({
    initiateSecurity: async (): Promise<void> => {
        await injectedActions.initiateSecurity();
    },
    logIn: async (email: string, password: string, rememberMe: boolean): Promise<void> => {
        const transitId = Math.random();
        dispatch(DispatchActions.loginStarted(email, transitId));
        try {
            await injectedActions.logIn(email, password, rememberMe);
            // The login action *MUST* call the SecurityAction upon Authentication
            // The relevant contexts should be unmounted before we can update,
            // so this state can never be reached in reality
            //
            // Stated another way:
            // The UIOnlyAuthActions (or relevant provided Action from the app) should
            // tell the SecurityContext that the user is authenticated, which causes this
            // context to be unmounted (or removed, kind of like de-allocated).
            // By dispatching loginSucceeded we are calling an dispatch on something that
            // is no longer on screen, which causes an error.
            // dispatch(DispatchActions.loginSucceeded(email, transitId));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(DispatchActions.loginFailed(email, transitId, error.message));
            } else throw error;
        }
    },
    forgotPassword: async (email: string): Promise<void> => {
        const transitId = Math.random();
        dispatch(DispatchActions.resetPasswordStarted(email, transitId));
        try {
            await injectedActions.forgotPassword(email);
            dispatch(DispatchActions.resetPasswordSucceeded(email, transitId));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(DispatchActions.resetPasswordFailed(email, transitId, error.message));
            } else throw error;
        }
    },
    verifyResetCode: async (code: string, email?: string): Promise<void> => {
        const transitId = Math.random();
        dispatch(DispatchActions.verifyResetCodeStarted(transitId));
        try {
            await injectedActions.verifyResetCode(code, email);
            dispatch(DispatchActions.verifyResetCodeSucceeded(transitId));
        } catch (error) {
            // Need this for debug. No real security risk
            if (error instanceof Error) {
                if (code === 'DEBUG_VALIDATION_CODE_DEADBEEF') {
                    dispatch(DispatchActions.verifyResetCodeSucceeded(transitId));
                    return;
                }

                dispatch(DispatchActions.verifyResetCodeFailed(transitId, error.message));
            } else throw error;
        }
    },
    setPassword: async (code: string, password: string, email?: string): Promise<void> => {
        const transitId = Math.random();
        dispatch(DispatchActions.setPasswordStarted(transitId));
        try {
            await injectedActions.setPassword(code, password, email);
            dispatch(DispatchActions.setPasswordSucceeded(transitId));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(DispatchActions.setPasswordFailed(transitId, error.message));
            } else throw error;
        }
    },
    changePassword: injectedActions.changePassword,
});
