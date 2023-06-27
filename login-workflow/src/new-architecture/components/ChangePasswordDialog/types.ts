import { DialogProps } from '@mui/material';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogProps = Omit<DialogProps, 'open'> & { passwordProps?: SetPasswordProps } & {
    errorDialogProps?: BasicDialogProps;
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
};
