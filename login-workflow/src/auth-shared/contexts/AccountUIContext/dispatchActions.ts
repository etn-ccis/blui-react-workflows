/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { ActionType } from '../../types/general';

/**
 * Named dispatch actions for account-related global state changes (i.e. login, forgot password, set password, verify reset code).
 */
export const AccountActions = {
    // Login
    loginStarted: (email: string, transitId: number | null) =>
        ({
            type: 'Authentication/Login/Started',
            payload: { email, transitId },
        } as const),

    loginSucceeded: (email: string, transitId: number | null) =>
        ({
            type: 'Authentication/Login/Succeeded',
            payload: { email, transitId },
        } as const),

    loginFailed: (email: string, transitId: number | null, errorMessage: string) =>
        ({
            type: 'Authentication/Login/Failed',
            payload: { email, transitId, errorMessage },
        } as const),
    resetLogin: () =>
        ({
            type: 'Authentication/Login/Reset',
        } as const),

    // Logout
    logout: () =>
        ({
            type: 'Authentication/Logout/Reset',
        } as const),

    // Reset password ("forgot password")
    resetPasswordReset: () =>
        ({
            type: 'Authentication/ResetPassword/Reset',
        } as const),

    resetPasswordStarted: (email: string, transitId: number | null) =>
        ({
            type: 'Authentication/ResetPassword/Started',
            payload: { email, transitId },
        } as const),

    resetPasswordSucceeded: (email: string, transitId: number | null) =>
        ({
            type: 'Authentication/ResetPassword/Succeeded',
            payload: { email, transitId },
        } as const),

    resetPasswordFailed: (email: string, transitId: number | null, errorMessage: string) =>
        ({
            type: 'Authentication/ResetPassword/Failed',
            payload: { email, transitId, errorMessage },
        } as const),

    // Verify code for reset password (code from "forgot password" email)
    verifyResetCodeReset: () =>
        ({
            type: 'Authentication/VerifyResetCode/Reset',
        } as const),

    verifyResetCodeStarted: (transitId: number | null) =>
        ({
            type: 'Authentication/VerifyResetCode/Started',
            payload: { transitId },
        } as const),

    verifyResetCodeSucceeded: (transitId: number | null) =>
        ({
            type: 'Authentication/VerifyResetCode/Succeeded',
            payload: { transitId },
        } as const),

    verifyResetCodeFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Authentication/VerifyResetCode/Failed',
            payload: { transitId, errorMessage },
        } as const),

    // Set password (after a "forgot password" request and verifying a code)
    setPasswordReset: () =>
        ({
            type: 'Authentication/SetPassword/Reset',
        } as const),

    setPasswordStarted: (transitId: number | null) =>
        ({
            type: 'Authentication/SetPassword/Started',
            payload: { transitId },
        } as const),

    setPasswordSucceeded: (transitId: number | null) =>
        ({
            type: 'Authentication/SetPassword/Succeeded',
            payload: { transitId },
        } as const),

    setPasswordFailed: (transitId: number | null, errorMessage: string) =>
        ({
            type: 'Authentication/SetPassword/Failed',
            payload: { transitId, errorMessage },
        } as const),
};

export type AccountActions = ActionType<typeof AccountActions>;
