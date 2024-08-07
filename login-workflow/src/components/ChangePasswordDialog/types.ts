import { DialogProps, TextFieldProps } from '@mui/material';
import { SuccessScreenProps } from '../../screens';
import { BasicDialogProps } from '../Dialog';
import { SetPasswordProps } from '../SetPassword';
import { ErrorManagerProps } from '../Error/types';

/**
 * Props of ChangePasswordDialogSlots
 */
export type ChangePasswordDialogSlots = {
    /**
     * used to define a function that renders success screen
     */
    SuccessScreen?: (props?: SuccessScreenProps) => JSX.Element;
};

/**
 * Props of ChangePasswordDialogSlotsProps
 */
export type ChangePasswordDialogSlotsProps = {
    /**
     * The props that will be passed to the success screen
     */
    SuccessScreen?: SuccessScreenProps;
};

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
     * Function called when the button is clicked on success screen
     * @returns void
     */
    onFinish?: () => void;

    /**
     * Callback function to call when the form is submitted
     * @returns void | Promise<void>
     */
    onSubmit?: () => void | Promise<void>;

    /**
     * Function called when the previous button is clicked
     * @returns void
     */
    onPrevious?: () => void;

    /**
     * Boolean that indicates whether the loading spinner should be displayed
     */
    loading?: boolean;

    /**
     * The props to pass to the current password field.
     * See [MUI's TextFieldProps API](https://mui.com/material-ui/api/text-field/) for more details.
     */
    currentPasswordTextFieldProps?: TextFieldProps;

    /**
     * Used to determine whether to show a success screen after the form is submitted
     */
    showSuccessScreen?: boolean;

    /**
     * Used for ChangePasswordDialog SuccessScreen
     */
    slots?: ChangePasswordDialogSlots;

    /**
     * Applied to slot from SuccessScreen
     */
    slotProps?: ChangePasswordDialogSlotsProps;

    /**
     * The configuration for customizing how errors are displayed
     */
    errorDisplayConfig?: ErrorManagerProps;
};
