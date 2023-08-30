import { DialogProps } from '@mui/material';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogProps = DialogProps & { PasswordProps?: SetPasswordProps } & {
    ErrorDialogProps?: BasicDialogProps;
} & {
    dialogTitle?: string;
    dialogDescription?: string;
    currentPasswordLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    currentPasswordChange?: (currentPassword: string) => void;
    enableButton?: boolean | (() => boolean);
    onSubmit?: () => void;
    onPrevious?: () => void;
    loading?: boolean;
};
