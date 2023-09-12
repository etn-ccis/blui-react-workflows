import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Component that renders a basic dialog with a title, body description, and a close button.
 *
 * @param title to show text in the title
 * @param body text to show in the body
 * @param onClose function to call when the close button is clicked
 * @param props all other props will be spread to the underlying Dialog component
 * @param dismissButtonText text to show in the close button
 *
 * @category Component
 */

export const DialogButtonStyles = (fullWidth = false): SxProps<Theme> => ({
    width: fullWidth ? '100%' : 100,
});

export type BasicDialogProps = Omit<DialogProps, 'open'> & {
    /**
     * The title for the screen
     */
    title?: string;

    /**
     * The text to show in the main dialog body
     */
    body?: string;

    /**
     * The function to call when the close button is clicked
     * @returns void
     */
    onClose?: () => void;

    /**
     * The text to show in the close button
     */
    dismissButtonText?: string;

    /**
     * Set the open / closed state of the dialog
     * @default false
     */
    open?: boolean;
};

export const BasicDialog: React.FC<React.PropsWithChildren<React.PropsWithChildren<BasicDialogProps>>> = (props) => {
    const { title, body, dismissButtonText, open = false, sx, ...dialogProps } = props;

    return (
        <Dialog sx={sx} {...dialogProps} open={open}>
            <DialogTitle
                sx={{
                    pt: { md: 4, sm: 2 },
                    px: { md: 3, sm: 2 },
                    pb: 0,
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent
                sx={{
                    flex: '1 1 auto',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: 2,
                    px: { md: 3, sm: 2 },
                    pb: { md: 2, sm: 3 },
                }}
            >
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    p: { md: 3, sm: 2 },
                }}
            >
                <Button variant="text" color="primary" onClick={dialogProps.onClose} sx={DialogButtonStyles()}>
                    {dismissButtonText || 'Okay'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
