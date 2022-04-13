import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import makeStyles from '@mui/styles/makeStyles';
import { sharedDialogStyles } from '../styles';
const useDialogStyles = makeStyles(sharedDialogStyles);

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
export const SimpleDialog: React.FC<React.PropsWithChildren<SimpleDialogProps>> = (props) => {
    const { title, body, ...dialogProps } = props;
    const classes = useDialogStyles();
    const { t } = useLanguageLocale();

    return (
        <Dialog {...dialogProps}>
            <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
            <DialogContent className={classes.dialogContent} style={{ flex: '1 1 auto' }}>
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button variant="text" color="primary" onClick={dialogProps.onClose} className={classes.dialogButton}>
                    {t('blui:ACTIONS.OKAY').toUpperCase()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
