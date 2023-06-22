import { DialogProps } from '@mui/material';
import { SetPasswordProps } from '../SetPassword';

// we should define a reusable type for the password input props (this should be defined with the reusable password component and reused by CreatePassword, ResetPassword, and ChangePassword).
export type ChangePasswordDialogProps = DialogProps & { PasswordProps?: SetPasswordProps } & {
    dialogTitle?: string;
    dialogDescription?: string;
    currentPasswordLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    currentPasswordChange?: (currentPassword: string) => void;
    enableButton?: boolean | (() => boolean);
    onSubmit?: () => void;
};
