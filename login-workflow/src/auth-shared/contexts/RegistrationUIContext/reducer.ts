/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationUIState } from './state';
import { initialTransitState, transitStart, transitSuccess, transitFailed } from '../TransitState';
import { RegistrationActions } from './dispatchActions';

/**
 * Default reducer for global [[RegistrationUIState]].
 *
 * @param prevState Previous [[RegistrationUIState]] to update.
 * @param action State change action, which should be of type [[RegistrationActions]].
 */
export const registrationReducer = (
    prevState: RegistrationUIState,
    action: RegistrationActions
): RegistrationUIState => {
    switch (action.type) {
        case 'Registration/RegisterUser/Reset':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    registrationTransit: initialTransitState,
                    email: null,
                    organizationName: null,
                },
            };

        case 'Registration/RegisterUser/Started':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    registrationTransit: transitStart(action.payload.transitId),
                },
            };
        case 'Registration/RegisterUser/Succeeded':
            if (prevState.inviteRegistration.registrationTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    registrationTransit: transitSuccess(action.payload.transitId),
                    email: action.payload.email,
                    organizationName: action.payload.organizationName,
                },
            };
        case 'Registration/RegisterUser/Failed':
            if (prevState.inviteRegistration.registrationTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    registrationTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
                    email: null,
                    organizationName: null,
                },
            };

        case 'Registration/LoadEula/Reset':
            return {
                ...prevState,
                eulaTransit: initialTransitState,
            };
        case 'Registration/LoadEula/Started':
            return {
                ...prevState,
                eulaTransit: transitStart(action.payload.transitId),
            };
        case 'Registration/LoadEula/Succeeded':
            if (prevState.eulaTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                eulaTransit: transitSuccess(action.payload.transitId),
            };
        case 'Registration/LoadEula/Failed':
            if (prevState.eulaTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                eulaTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
            };

        case 'Registration/ValidateUser/Reset':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    validationTransit: initialTransitState,
                },
            };

        case 'Registration/ValidateUser/Started':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    validationTransit: transitStart(action.payload.transitId),
                },
            };
        case 'Registration/ValidateUser/Succeeded':
            if (prevState.inviteRegistration.validationTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    validationTransit: transitSuccess(action.payload.transitId),
                },
            };
        case 'Registration/ValidateUser/Failed':
            if (prevState.inviteRegistration.validationTransit.transitId !== action.payload.transitId) {
                return prevState;
            }

            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    validationTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
                },
            };
        case 'Registration/RequestCode/Reset':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    codeRequestTransit: initialTransitState,
                },
            };
        case 'Registration/RequestCode/Started':
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    codeRequestTransit: transitStart(action.payload.transitId),
                },
            };
        case 'Registration/RequestCode/Succeeded':
            if (prevState.inviteRegistration.codeRequestTransit.transitId !== action.payload.transitId) {
                return prevState;
            }
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    codeRequestTransit: transitSuccess(action.payload.transitId),
                },
            };
        case 'Registration/RequestCode/Failed':
            if (prevState.inviteRegistration.codeRequestTransit.transitId !== action.payload.transitId) {
                return prevState;
            }
            return {
                ...prevState,
                inviteRegistration: {
                    ...prevState.inviteRegistration,
                    codeRequestTransit: transitFailed(action.payload.errorMessage, action.payload.transitId),
                },
            };
        default:
            return prevState;
    }
};
