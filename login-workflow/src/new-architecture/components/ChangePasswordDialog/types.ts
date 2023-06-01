import { DialogProps } from '@mui/material';
import { PasswordRequirement } from '../SetPassword';

// we should define a reusable type for the password input props (this should be defined with the reusable password component and reused by CreatePassword, ResetPassword, and ChangePassword).
type SetPasswordProps = {
    newPasswordLabel?: string;
    initialNewPasswordValue?: string;
    confirmPasswordLabel?: string;
    initialConfirmPasswordValue?: string;
    passwordRequirements?: PasswordRequirement[];
};

export type ChangePasswordDialogProps = DialogProps &
    SetPasswordProps & {
        onSubmit: (oldPassword: string, newPassword: string) => void;
    };
