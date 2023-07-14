import { SxProps } from '@mui/material/styles';
import React from 'react';
import { BasicDialog } from '../Dialog/BasicDialog';
import ErrorMessageBox from './ErrorMessageBox';

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
    open?: boolean;
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
 * @param open whether the dialog is open
 * @param title text to show in the title of the dialog
 *
 * @category Component
 */

const ErrorManager: React.FC<ErrorManagerProps> = (props): JSX.Element => {
    const {
        children,
        mode,
        dismissible,
        dismissButtonText,
        messageBoxFontColor,
        messageBoxBackgroundColor,
        errorMessage,
        onClose,
        messageBoxSx,
        open,
        title,
        position,
    } = props;

    //eslint-disable-next-line no-console
    console.log('errorMessage:', errorMessage);

    return mode === 'dialog' && errorMessage ? (
        <>
            {children}
            <BasicDialog
                open={open}
                title={title}
                body={errorMessage}
                onClose={onClose}
                dismissButtonText={dismissButtonText}
            />
        </>
    ) : mode === 'message-box' && errorMessage ? (
        <>
            {position === 'top' && (
                <ErrorMessageBox
                    errorMessage={errorMessage}
                    dismissible={dismissible}
                    sx={messageBoxSx}
                    backgroundColor={messageBoxBackgroundColor}
                    fontColor={messageBoxFontColor}
                />
            )}
            {children}
            {position === 'bottom' && (
                <ErrorMessageBox
                    errorMessage={errorMessage}
                    dismissible={dismissible}
                    sx={messageBoxSx}
                    backgroundColor={messageBoxBackgroundColor}
                    fontColor={messageBoxFontColor}
                />
            )}
        </>
    ) : mode === 'both' && errorMessage ? (
        <>
            {position === 'top' && (
                <ErrorMessageBox
                    errorMessage={errorMessage}
                    dismissible={dismissible}
                    sx={messageBoxSx}
                    backgroundColor={messageBoxBackgroundColor}
                    fontColor={messageBoxFontColor}
                />
            )}
            {children}
            {position === 'bottom' && (
                <ErrorMessageBox
                    errorMessage={errorMessage}
                    dismissible={dismissible}
                    sx={messageBoxSx}
                    backgroundColor={messageBoxBackgroundColor}
                    fontColor={messageBoxFontColor}
                />
            )}
            <BasicDialog
                open={open}
                title={title}
                body={errorMessage}
                onClose={onClose}
                dismissButtonText={dismissButtonText}
            />
        </>
    ) : (
        <>{children}</>
    );
};
export default ErrorManager;
