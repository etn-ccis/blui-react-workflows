import { DialogProps } from '@mui/material';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';

export type ChangePasswordDialogProps = DialogProps & { PasswordProps?: SetPasswordProps } & {
    ErrorDialogProps?: BasicDialogProps;
} & {
    /**
     * The title to display in the dialog
     */
    dialogTitle?: string;

    /**
     * The description to display in the dialog
     */
    dialogDescription?: string;

    /**
     * The label to display for the current password field
     */
    currentPasswordLabel?: string;

    /**
     * The label to display for the previous button
     */
    previousLabel?: string;

    /**
     * The label to display for the next button
     */
    nextLabel?: string;

    /**
     * Function called when the current password field changes
     * @param {string} currentPassword - the updated value from the currentPassword field
     * @returns void
     */
    currentPasswordChange?: (currentPassword: string) => void;

    /**
     * Configure whether the next button is enabled or disabled.
     */
    enableButton?: boolean | (() => boolean);

    /**
     * Callback function to call when the form is submitted
     * @returns void
     */
    onSubmit?: () => Promise<void>;

    /**
     * Function called when the previous button is clicked
     * @returns void
     */
    onPrevious?: () => void;

    loading?: boolean;
};
