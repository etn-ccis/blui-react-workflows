import React, { useCallback } from 'react';
import { BasicDialog } from '../Dialog/BasicDialog';
import ErrorMessageBox from './ErrorMessageBox';
import { ErrorManagerProps } from './types';
import { TOptions } from 'i18next';

/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither.
 *
 * @param {ErrorManagerProps} props - props of errorManager component
 *
 * @category Component
 */

const ErrorManager: React.FC<ErrorManagerProps> = (props): JSX.Element => {
    const {
        children,
        mode = 'dialog',
        title,
        error = '',
        errorOptions,
        titleOptions,
        onClose = (): void => {},
        dialogConfig,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        t = (key: string, _options?: TOptions): string => key,
        messageBoxConfig = {
            position: 'top',
        },
    } = props;

    const ErrorDialogWithProps = useCallback(
        (): JSX.Element => (
            <BasicDialog
                open={error.length > 0}
                title={t(dialogConfig?.title ?? title ?? 'Error', titleOptions)}
                body={t(error, errorOptions)}
                onClose={onClose}
                dismissButtonText={t(dialogConfig?.dismissLabel ?? 'Okay')}
                sx={dialogConfig?.sx}
            />
        ),
        [dialogConfig, title, error, errorOptions, titleOptions, onClose, t]
    );

    const ErrorMessageBoxWithProps = useCallback((): JSX.Element => {
        const { dismissible = true, fontColor, backgroundColor, sx } = messageBoxConfig;

        return (
            <ErrorMessageBox
                title={t(messageBoxConfig?.title ?? title ?? 'Error', titleOptions)}
                errorMessage={t(error, errorOptions)}
                dismissible={dismissible}
                sx={sx}
                backgroundColor={backgroundColor}
                fontColor={fontColor}
                onClose={onClose}
            />
        );
    }, [error, errorOptions, titleOptions, title, messageBoxConfig, onClose, t]);

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
