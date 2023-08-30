import React from 'react';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export type ErrorMessageBoxProps = {
    errorMessage: string;
    backgroundColor?: string;
    dismissible?: boolean;
    fontColor?: string;
    onClose?: () => void;
    sx?: SxProps<Theme>;
};
/**
 * Component that renders a basic message box with an error message and a configurable dismiss button.
 *
 * @param errorMessage text to show in the title
 * @param backgroundColor the background color of the message box
 * @param dismissible whether the message box can be dismissed
 * @param fontColor the font color of the text inside the message box
 * @param onClose function to call when the close button is clicked
 * @param sx styles passed to the underlying root component
 *
 * @category Component
 */
const ErrorMessageBox = (props: ErrorMessageBoxProps): JSX.Element => {
    const { errorMessage, backgroundColor, dismissible = true, fontColor, onClose = (): void => {}, sx } = props;
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
            <Typography variant="body2">{errorMessage}</Typography>
        </Box>
    );
};
export default ErrorMessageBox;
