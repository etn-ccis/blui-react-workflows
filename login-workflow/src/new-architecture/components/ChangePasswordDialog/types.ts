import { SxProps } from '@mui/material';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogProps = { passwordProps?: SetPasswordProps } & {
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
    sx?: SxProps;
};
