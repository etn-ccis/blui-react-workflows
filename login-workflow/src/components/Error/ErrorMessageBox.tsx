import React from 'react';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export type ErrorMessageBoxProps = {
    /**
     * The text to show in the title
     */
    title: string;
    /**
     * The text to show in the message
     */
    errorMessage: string;

    /**
     * The background color of the message box
     */
    backgroundColor?: string;

    /**
     * Boolean whether the message box can be dismissed
     * @default true
     */
    dismissible?: boolean;

    /**
     * The font color of the text inside the message box
     */
    fontColor?: string;

    /**
     * The function to call when the close button is clicked
     * @returns void
     */
    onClose?: () => void;

    /**
     * Styles passed to the underlying root component
     */
    sx?: SxProps<Theme>;
};

/**
 * Component that renders a basic message box with an error message and a configurable dismiss button.
 *
 * @param text to show as the title
 * @param errorMessage text to show in the message
 * @param backgroundColor the background color of the message box
 * @param dismissible whether the message box can be dismissed
 * @param fontColor the font color of the text inside the message box
 * @param onClose function to call when the close button is clicked
 * @param sx styles passed to the underlying root component
 *
 * @category Component
 */
const ErrorMessageBox = (props: ErrorMessageBoxProps): JSX.Element => {
    const { title, errorMessage, backgroundColor, dismissible = true, fontColor, onClose = (): void => {}, sx } = props;

    return (
        <Box
            sx={[
                {
                    width: '100%',
                    backgroundColor: backgroundColor || 'error.main',
                    borderRadius: 4,
                    p: 2,
                    color: (t) => fontColor || t.palette.error.contrastText,
                    my: 2,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {dismissible !== false && (
                <Close
                    data-testid={'error-message-box-close'}
                    sx={{
                        '&:hover': {
                            cursor: 'pointer',
                        },
                        float: 'right',
                    }}
                    onClick={(): void => {
                        onClose();
                    }}
                />
            )}
            <Box>
                <Typography>{title}</Typography>
                <Typography sx={{ fontSize: 'body2' }}>{errorMessage}</Typography>
            </Box>
        </Box>
    );
};
export default ErrorMessageBox;
