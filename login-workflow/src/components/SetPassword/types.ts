import { MutableRefObject } from 'react';

/**
 * Parameters for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    /**
     * @param description The description of the password requirement
     * @returns string
     */
    description: string;

    /**
     * @param regex The regex to validate the password
     * @returns RegExp
     */
    regex: RegExp;
};

export type SetPasswordProps = {
    /**
     * @param onPasswordChange called when the new password or confirm new password fields value changes
     * @returns void
     */
    onPasswordChange?: (passwords: { password: string; confirm: string }) => void;

    /**
     * @param newPasswordLabel The label for the new password field (default = 'Password')
     * @returns string
     */
    newPasswordLabel?: string;

    /**
     * @param initialNewPasswordValue The initial value for the new password field
     * @returns string
     */
    initialNewPasswordValue?: string;

    /**
     * @param confirmPasswordLabel The label for the confirm password field (default = 'Confirm')
     * @returns string
     */
    confirmPasswordLabel?: string;

    /**
     * @param initialConfirmPasswordValue The initial value for the confirm password
     * @returns string
     */
    initialConfirmPasswordValue?: string;

    /**
     * @param passwordRequirements The requirements to set password
     * @returns PasswordRequirement array
     */
    passwordRequirements?: PasswordRequirement[] | [];

    /**
     * @param passwordRef The ref to forward to the password input
     * @returns string
     */
    passwordRef?: MutableRefObject<any>;

    /**
     * @param confirmRef The ref to forward to the confirm password input
     * @returns MutableRefObject <any>
     */
    confirmRef?: MutableRefObject<any>;

    /**
     * @param passwordNotMatchError The text for showing message when passwords do not match
     * @returns string
     */
    passwordNotMatchError?: string;

    /**
     * @param onSubmit The function to call when the form is submitted
     * @returns void
     */
    onSubmit?: () => void;
};
