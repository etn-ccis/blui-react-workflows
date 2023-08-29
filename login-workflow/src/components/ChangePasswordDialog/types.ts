import { DialogProps, SxProps } from '@mui/material';
import { SuccessScreenProps } from '../../screens';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogSlots = {
    SuccessScreen?: (props?: SuccessScreenProps) => JSX.Element;
};

export type ChangePasswordDialogSlotsProps = {
    SuccessScreen?: SuccessScreenProps;
};

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
    sx?: SxProps;
    loading?: boolean;
    showSuccessScreen?: boolean;
    slots?: ChangePasswordDialogSlots;
    slotProps?: ChangePasswordDialogSlotsProps;
};
