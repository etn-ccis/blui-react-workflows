import React from 'react';
import { DialogProps, Dialog, Typography, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { useDialogStyles } from '../styles';

export type SimpleDialogProps = DialogProps & {
    title: string;
    body: string;
    onClose: () => void;
};

/**
 * Component that renders a simple dialog with a title, body description, and a close button.
 *
 * @param title text to show in the title
 * @param body text to show in the body
 * @param onClose function to call when the close button is clicked
 * @param props all other props will be spread to the underlying Dialog component
 *
 * @category Component
 */
export const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
    const { title, body, ...dialogProps } = props;
    const classes = useDialogStyles();
    const { t } = useLanguageLocale();

    return (
        <Dialog disableBackdropClick {...dialogProps}>
            <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
            <DialogContent className={classes.dialogContent} style={{ flex: '1 1 auto' }}>
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button variant="text" color="primary" onClick={dialogProps.onClose} className={classes.dialogButton}>
                    {t('ACTIONS.OKAY').toUpperCase()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
