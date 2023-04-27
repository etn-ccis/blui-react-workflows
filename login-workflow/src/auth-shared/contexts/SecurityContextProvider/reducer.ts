/**
 * @packageDocumentation
 * @module SecurityContextProvider
 */

import { SecurityContextState } from './types';

/**
 * @internal
 * @private
 */
export type Action =
    | { type: 'userAuthenticated'; payload: { email: string; userId: string; rememberMe: boolean } }
    | { type: 'userNotAuthenticated'; payload: { clearRememberMe?: boolean; overrideRememberMeEmail?: string } }
    | { type: 'showChangePassword' }
    | { type: 'hideChangePassword' };

/**
 * @internal
 * @private
 *
 * Reducer for [[SecurityContextProvider]].
 *
 * @param prevState Previous [[SecurityContextState]] to update.
 * @param action State change action, which should be of type [[Action]].
 */
export const reducer = (prevState: SecurityContextState, action: Action): SecurityContextState => {
    switch (action.type) {
        case 'userAuthenticated':
            return {
                email: action.payload.email,
                userId: action.payload.userId,
                rememberMeDetails: {
                    email: action.payload.rememberMe ? action.payload.email : undefined,
                    rememberMe: action.payload.rememberMe,
                },
                isLoading: false,
                isSignOut: false,
                isAuthenticatedUser: true,
                isShowingChangePassword: false,
            };
        case 'userNotAuthenticated': {
            const overrideExists = (action.payload.overrideRememberMeEmail?.length ?? 0) > 0;
            let rememberEmail = prevState.rememberMeDetails.email;
            let rememberMe = prevState.rememberMeDetails.rememberMe;
            if (overrideExists) {
                rememberEmail = action.payload.overrideRememberMeEmail;
                rememberMe = true;
            } else if (action.payload.clearRememberMe) {
                rememberEmail = undefined;
                rememberMe = false;
            }

            return {
                email: undefined,
                userId: undefined,
                rememberMeDetails: {
                    email: rememberEmail,
                    rememberMe: rememberMe,
                },
                isLoading: false,
                isSignOut: true,
                isAuthenticatedUser: false,
                isShowingChangePassword: false,
            };
        }
        case 'showChangePassword':
            return {
                ...prevState,
                isShowingChangePassword: true,
            };
        case 'hideChangePassword':
            return {
                ...prevState,
                isShowingChangePassword: false,
            };
        default:
            return prevState;
    }
};
