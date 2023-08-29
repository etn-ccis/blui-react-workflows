import { DialogProps, SxProps } from '@mui/material';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogProps = DialogProps & { PasswordProps?: SetPasswordProps } & {
    ErrorDialogProps?: BasicDialogProps;
} & {
    /**
     * @param dialogTitle The title to display in the dialog
     * @returns string
     */
    dialogTitle?: string;

    /**
     * @param dialogDescription The description to display in the dialog
     * @returns string
     */
    dialogDescription?: string;

    /**
     * @param currentPasswordLabel The label to display for the current password field
     * @returns string
     */
    currentPasswordLabel?: string;

    /**
     * @param previousLabel The label to display for the previous button
     * @returns string
     */
    previousLabel?: string;

    /**
     * @param nextLabel The label to display for the next button
     * @returns string
     */
    nextLabel?: string;

    /**
     * @param currentPasswordChange Called when the current password field changes
     * @returns void
     */
    currentPasswordChange?: (currentPassword: string) => void;

    /**
     * @param enableButton Boolean to enable and disable the button
     * @returns boolean
     */
    enableButton?: boolean | (() => boolean);

    /**
     * @param onSubmit Callback function to call when the form is submitted
     * @returns void
     */
    onSubmit?: () => void;

    /**
     * @param onPrevious Called when the previous button is clicked
     * @returns void
     */
    onPrevious?: () => void;

    /**
     * @param sx The styles passed to the underlying root component
     * @returns SxProps
     */
    sx?: SxProps;

    /**
     * @param loading Boolean that indicates whether the loading spinner should be displayed
     * @returns boolean
     */
    loading?: boolean;
};
