import { MutableRefObject } from 'react';

/**
 * Parameters for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    description: string;
    regex: RegExp;
};

export type SetPasswordProps = {
    onPasswordChange?: (passwords: { password: string; confirm: string }) => void;
    newPasswordLabel?: string;
    initialNewPasswordValue?: string;
    confirmPasswordLabel?: string;
    initialConfirmPasswordValue?: string;
    passwordRequirements?: PasswordRequirement[] | [];
    passwordRef?: MutableRefObject<any>;
    confirmRef?: MutableRefObject<any>;
    passwordNotMatchError?: string;
    onSubmit?: () => void;
};
