import { DialogProps } from '@mui/material';
import { MutableRefObject } from 'react';
import { SetPasswordProps } from '../SetPassword';

// we should define a reusable type for the password input props (this should be defined with the reusable password component and reused by CreatePassword, ResetPassword, and ChangePassword).
export type ChangePasswordDialogProps = DialogProps & { PasswordProps: SetPasswordProps } & {
    currentPwdRef?: MutableRefObject<any>;
    currentPasswordChange?: (currentPassword: string) => void;
    enableButton?: boolean;
    onSubmit: (oldPassword: string, newPassword: string) => void;
};
