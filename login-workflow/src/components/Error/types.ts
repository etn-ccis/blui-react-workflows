import { SxProps, Theme } from '@mui/material/styles';
import { TFunction, TOptions } from 'i18next';

export type AuthError = {
    cause: { title: string; errorMessage: string; errorOptions?: TOptions; titleOptions?: TOptions };
};

export type ErrorManagerProps = {
    /**
     * Determines whether to display a dialog, a message box, or neither
     */
    mode?: 'dialog' | 'message-box' | 'none';

    /**
     * Title to display in message box and dialog
     */
    title?: string;

    /**
     * The function to call when the close/dismiss button is clicked
     * @returns void
     */
    onClose?: () => void;

    /**
     * The error text to display
     */
    error?: string;

    /**
     * Interpolate string with a dynamic value to pass values using t function for message
     */
    errorOptions?: TOptions;

    /**
     * Interpolate string with a dynamic value to pass values using t function for title
     */
    titleOptions?: TOptions;

    /**
     * Translate function to translate error related text
     */
    t?: TFunction;

    /**
     * Configuration options when using mode='dialog'
     * @param {string} dialogConfig.title - The title used in the dialog header
     * @param {string} dialogConfig.dismissLabel - The label on the dismiss button in dialog mode.
     */
    dialogConfig?: {
        dismissLabel?: string;
        title?: string;
        sx?: SxProps<Theme>;
    };
    messageBoxConfig?: {
        title?: string;
        dismissible?: boolean;
        position?: 'top' | 'bottom';
        fontColor?: string;
        backgroundColor?: string;
        sx?: SxProps<Theme>;
    };
    children?: React.ReactNode;
};
