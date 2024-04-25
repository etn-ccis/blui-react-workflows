import React from 'react';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ErrorMessageBoxProps } from './types';

/**
 * Component that renders a basic message box with an error message and a configurable dismiss button.
 *
 * @param {ErrorMessageBoxProps} props - props of errorMessageBox component
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
                <Typography variant="body2">{errorMessage}</Typography>
            </Box>
        </Box>
    );
};
export default ErrorMessageBox;
