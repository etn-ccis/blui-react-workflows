/**
 * @packageDocumentation
 * @module Types
 */

/**
 * Parameters for the [[ResetPasswordSent]] component.
 */
export type ResetPasswordParams = {
    email: string;
};

/**
 * Parameters for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};
