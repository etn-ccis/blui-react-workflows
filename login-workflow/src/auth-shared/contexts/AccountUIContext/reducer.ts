/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { AccountUIState, initialAccountUIState } from './state';
import { AccountUIReducer } from './types';
import { initialTransitState, transitStart, transitSuccess, transitFailed } from '../TransitState';
import { AccountActions } from './dispatchActions';

/**
 * Default reducer for global [[AccountUIState]].
 *
 * @param prevState Previous [[AccountUIState]] to update.
 * @param action State change action, which should be of type [[AccountActions]].
 */
export const defaultAccountUIReducer: AccountUIReducer = (prevState: AccountUIState, action: AccountActions) => {
    switch (action.type) {
        // Login
        case 'Authentication/Login/Started':
            return {
                ...prevState,
                login: {
                    ...transitStart(),
                    email: action.payload.email,
                },
                isLogOut: false,
                email: action.payload.email,
            };
        case 'Authentication/Login/Succeeded':
            return {
                ...prevState,
                login: {
                    ...transitSuccess(),
                    email: action.payload.email,
                },
                isLogOut: false,
                email: action.payload.email,
            };
        case 'Authentication/Login/Failed':
            return {
                ...prevState,
                login: {
                    ...transitFailed(action.payload.errorMessage),
                    email: action.payload.email,
                },
                isLogOut: false,
                email: action.payload.email,
            };
        case 'Authentication/Login/Reset':
            return {
                ...initialAccountUIState,
            };

        // Logout
        case 'Authentication/Logout/Reset':
            return {
                ...initialAccountUIState,
                isLogOut: true,
            };

        // Reset Password ("forgot password" request)
        case 'Authentication/ResetPassword/Reset':
            return {
                ...prevState,
                forgotPassword: {
                    ...initialTransitState,
                    email: null,
                },
            };
        case 'Authentication/ResetPassword/Started':
            return {
                ...prevState,
                forgotPassword: {
                    ...transitStart(action.payload.transitId),
                    email: action.payload.email,
                },
            };
        case 'Authentication/ResetPassword/Succeeded':
            if (prevState.forgotPassword.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                forgotPassword: {
                    ...transitSuccess(action.payload.transitId),
                    email: action.payload.email,
                },
            };
        case 'Authentication/ResetPassword/Failed':
            if (prevState.forgotPassword.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                forgotPassword: {
                    ...transitFailed(action.payload.errorMessage, action.payload.transitId),
                    email: action.payload.email,
                },
            };

        // Verify code for reset password (code from "forgot password" email)
        case 'Authentication/VerifyResetCode/Reset':
            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    verifyResetCodeTransit: initialTransitState,
                },
            };
        case 'Authentication/VerifyResetCode/Started':
            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    verifyResetCodeTransit: transitStart(action.payload.transitId),
                },
            };
        case 'Authentication/VerifyResetCode/Succeeded':
            if (prevState.setPassword.verifyResetCodeTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    verifyResetCodeTransit: transitSuccess(action.payload.transitId),
                },
            };
        case 'Authentication/VerifyResetCode/Failed':
            if (prevState.setPassword.verifyResetCodeTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    verifyResetCodeTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
                },
            };

        // Set password (after a "forgot password" request and verifying a code)
        case 'Authentication/SetPassword/Reset':
            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    setPasswordTransit: initialTransitState,
                },
            };
        case 'Authentication/SetPassword/Started':
            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    setPasswordTransit: transitStart(action.payload.transitId),
                },
            };
        case 'Authentication/SetPassword/Succeeded':
            if (prevState.setPassword.setPasswordTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    setPasswordTransit: transitSuccess(action.payload.transitId),
                },
            };
        case 'Authentication/SetPassword/Failed':
            if (prevState.setPassword.setPasswordTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                setPassword: {
                    ...prevState.setPassword,
                    setPasswordTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
                },
            };

        default:
            return prevState;
    }
};
