/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { ActionType } from '../../types/general';

/**
 * Named dispatch actions for account-related global state changes (i.e. load EULA, validate invite registration request, complete registration).
 */
export const RegistrationActions = {
    loadEulaReset: () =>
        ({
            type: 'Registration/LoadEula/Reset',
        } as const),

    loadEulaStarted: (transitId: number | null, language: string) =>
        ({
            type: 'Registration/LoadEula/Started',
            payload: { transitId, language },
        } as const),

    loadEulaSucceeded: (transitId: number | null) =>
        ({
            type: 'Registration/LoadEula/Succeeded',
            payload: { transitId },
        } as const),

    loadEulaFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Registration/LoadEula/Failed',
            payload: { transitId, errorMessage },
        } as const),
    requestRegistrationCodeReset: () =>
        ({
            type: 'Registration/RequestCode/Reset',
        } as const),
    requestRegistrationCodeStarted: (transitId: number | null) =>
        ({
            type: 'Registration/RequestCode/Started',
            payload: { transitId },
        } as const),
    requestRegistrationCodeSucceeded: (transitId: number | null) =>
        ({
            type: 'Registration/RequestCode/Succeeded',
            payload: { transitId },
        } as const),
    requestRegistrationCodeFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Registration/RequestCode/Failed',
            payload: { transitId, errorMessage },
        } as const),

    validateUserRegistrationReset: () =>
        ({
            type: 'Registration/ValidateUser/Reset',
        } as const),

    validateUserRegistrationStarted: (transitId: number | null) =>
        ({
            type: 'Registration/ValidateUser/Started',
            payload: { transitId },
        } as const),

    validateUserRegistrationSucceeded: (transitId: number | null) =>
        ({
            type: 'Registration/ValidateUser/Succeeded',
            payload: { transitId },
        } as const),

    validateUserRegistrationFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Registration/ValidateUser/Failed',
            payload: { transitId, errorMessage },
        } as const),

    registerUserReset: () =>
        ({
            type: 'Registration/RegisterUser/Reset',
        } as const),

    registerUserStarted: (transitId: number | null) =>
        ({
            type: 'Registration/RegisterUser/Started',
            payload: { transitId },
        } as const),

    registerUserSucceeded: (transitId: number | null, email: string, organizationName: string) =>
        ({
            type: 'Registration/RegisterUser/Succeeded',
            payload: { transitId, email, organizationName },
        } as const),

    registerUserFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Registration/RegisterUser/Failed',
            payload: { transitId, errorMessage },
        } as const),
};

export type RegistrationActions = ActionType<typeof RegistrationActions>;
