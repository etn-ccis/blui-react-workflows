import { MutableRefObject } from 'react';
import { TextFieldProps } from '@mui/material';

/**
 * Parameters for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    /**
     * The description of the password requirement
     */
    description: string;

    /**
     * The regex to validate the password
     */
    regex: RegExp;
};

export type SetPasswordProps = {
    /**
     * Function called when the new password or confirm new password fields value changes
     * @param {string} password - new password value
     * @param {string} confirm - confirm password value
     * @returns void
     */
    onPasswordChange?: (passwords: { password: string; confirm: string }) => void;

    /**
     * The label for the new password field
     * @default Password
     */
    newPasswordLabel?: string;

    /**
     * The initial value for the new password field
     */
    initialNewPasswordValue?: string;

    /**
     * The label for the confirm password field
     * @default Confirm
     */
    confirmPasswordLabel?: string;

    /**
     * The initial value for the confirm password
     */
    initialConfirmPasswordValue?: string;

    /**
     * A list of password complexity requirements
     */
    passwordRequirements?: PasswordRequirement[];

    /**
     * The ref to forward to the password input
     */
    passwordRef?: MutableRefObject<any>;

    /**
     * The ref to forward to the confirm password input
     */
    confirmRef?: MutableRefObject<any>;

    /**
     * The text for showing message when passwords do not match
     */
    passwordNotMatchError?: string;

    /**
     * The function to call when the form is submitted
     * @returns void
     */
    onSubmit?: () => void;

    // The props to pass to the password text field.
    passwordTextFieldProps?: TextFieldProps;

    // The props to pass to the confirm password text field.
    confirmPasswordTextFieldProps?: TextFieldProps;
};
