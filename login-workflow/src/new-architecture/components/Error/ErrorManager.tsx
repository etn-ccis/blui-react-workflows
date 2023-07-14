import { SxProps } from '@mui/material/styles';
import React from 'react';
import { BasicDialog } from '../Dialog/BasicDialog';
import ErrorMessageBox from './ErrorMessageBox';

export type AuthError = { cause: { title: string; errorMessage: string } };

export type ErrorManagerProps = {
    mode?: 'dialog' | 'message-box' | 'both' | 'none';
    dismissible?: boolean;
    position?: 'top' | 'bottom';
    dismissButtonText?: string;
    messageBoxFontColor?: string;
    messageBoxBackgroundColor?: string;
    errorMessage?: string;
    onClose?: () => void;
    messageBoxSx?: SxProps;
    title?: string;
    children?: React.ReactNode;
};
/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, both, or neither.
 *
 * @param mode determines whether to display a dialog, a message box, both, or neither
 * @param dismissible whether the message box can be dismissed
 * @param dismissButtonText text to show in the close button
 * @param position determines whether the message box should be displayed at the top or bottom of the screen
 * @param messageBoxFontColor the font color of the text inside the message box
 * @param messageBoxBackgroundColor the background color of the message box
 * @param errorMessage error text to display
 * @param onClose function to call when the close/dismiss button is clicked
 * @param messageBoxSx sx styles passed to the underlying root(Box) component
 * @param title text to show in the title of the dialog
 *
 * @category Component
 */

const ErrorManager: React.FC<ErrorManagerProps> = (props): JSX.Element => {
    const {
        children,
        mode = 'dialog',
        dismissible = true,
        dismissButtonText,
        messageBoxFontColor,
        messageBoxBackgroundColor,
        errorMessage,
        onClose,
        messageBoxSx,
        title,
        position,
    } = props;

    //eslint-disable-next-line no-console
    console.log('errorMessage:', errorMessage);

    const ErrorDialogWithProps = (): JSX.Element => (
        <BasicDialog
            open={errorMessage.length > 0}
            title={title}
            body={errorMessage}
            onClose={onClose}
            dismissButtonText={dismissButtonText}
        />
    );

    const ErrorMessageBoxWithProps = (): JSX.Element => (
        <ErrorMessageBox
            errorMessage={errorMessage}
            dismissible={dismissible}
            sx={messageBoxSx}
            backgroundColor={messageBoxBackgroundColor}
            fontColor={messageBoxFontColor}
            onClose={onClose}
        />
    );

    return mode === 'dialog' && errorMessage ? (
        <>
            {children}
            <ErrorDialogWithProps />
        </>
    ) : mode === 'message-box' && errorMessage ? (
        <>
            {position === 'top' && <ErrorMessageBoxWithProps />}
            {children}
            {position === 'bottom' && <ErrorMessageBoxWithProps />}
        </>
    ) : (
        <>{children}</>
    );
};
export default ErrorManager;
