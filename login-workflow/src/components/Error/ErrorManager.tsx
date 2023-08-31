import React, { useCallback } from 'react';
import { BasicDialog } from '../Dialog/BasicDialog';
import ErrorMessageBox from './ErrorMessageBox';
import { useLanguageLocale } from '../../hooks';
import { SxProps } from '@mui/material/styles';

export type AuthError = { cause: { title: string; errorMessage: string } };

export type ErrorManagerProps = {
    mode?: 'dialog' | 'message-box' | 'none';
    onClose?: () => void;
    error?: string;
    dialogConfig?: {
        title?: string;
        dismissLabel?: string;
    };
    messageBoxConfig?: {
        dismissible?: boolean;
        position?: 'top' | 'bottom';
        fontColor?: string;
        backgroundColor?: string;
        sx?: SxProps;
    };
    children?: React.ReactNode;
};
/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither.
 *
 * @param mode determines whether to display a dialog, a message box, or neither
 * @param onClose function to call when the close/dismiss button is clicked
 * @param error error text to display
 * @param dialogConfig configuration for the error dialog
 * @param dialogConfig.title text to show in the title of the dialog
 * @param dialogConfig.dismissLabel text to show in the close button
 * @param messageBoxConfig configuration for the error message box
 * @param messageBoxConfig.dismissible whether the message box can be dismissed
 * @param messageBoxConfig.position determines whether the message box should be displayed at the top or bottom of the screen
 * @param messageBoxConfig.fontColor the font color of the text inside the message box
 * @param messageBoxConfig.backgroundColor the background color of the message box
 * @param messageBoxConfig.sx sx styles passed to the underlying root(Box) component
 *
 * @category Component
 */

const ErrorManager: React.FC<ErrorManagerProps> = (props): JSX.Element => {
    const { t } = useLanguageLocale();
    const {
        children,
        mode = 'dialog',
        error = '',
        onClose = (): void => {},
        dialogConfig,
        messageBoxConfig = {
            position: 'top',
        },
    } = props;

    const ErrorDialogWithProps = useCallback((): JSX.Element => {
        const { title = t('bluiCommon:MESSAGES.ERROR'), dismissLabel } = dialogConfig;

        return (
            <BasicDialog
                open={error.length > 0}
                title={title}
                body={error}
                onClose={onClose}
                dismissButtonText={dismissLabel}
            />
        );
    }, [dialogConfig, error, onClose, t]);

    const ErrorMessageBoxWithProps = useCallback((): JSX.Element => {
        const { dismissible = true, fontColor, backgroundColor, sx } = messageBoxConfig;

        return (
            <ErrorMessageBox
                errorMessage={error}
                dismissible={dismissible}
                sx={sx}
                backgroundColor={backgroundColor}
                fontColor={fontColor}
                onClose={onClose}
            />
        );
    }, [error, messageBoxConfig, onClose]);

    return mode === 'dialog' && error.length > 0 ? (
        <>
            {children}
            <ErrorDialogWithProps />
        </>
    ) : mode === 'message-box' && error.length > 0 ? (
        <>
            {messageBoxConfig.position !== 'bottom' && <ErrorMessageBoxWithProps />}
            {children}
            {messageBoxConfig.position === 'bottom' && <ErrorMessageBoxWithProps />}
        </>
    ) : (
        <>{children}</>
    );
};
export default ErrorManager;
