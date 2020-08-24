import React from 'react';
import {
    DialogProps,
    Dialog,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    useTheme,
} from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';

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
    const theme = useTheme();
    const { t } = useLanguageLocale();

    return (
        <Dialog disableBackdropClick {...dialogProps}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ flex: '1 1 auto', overflow: 'auto' }}>
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions style={{ padding: theme.spacing(2) }}>
                <Button variant="text" color="primary" onClick={dialogProps.onClose} style={{ width: 100 }}>
                    {t('ACTIONS.OKAY')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
