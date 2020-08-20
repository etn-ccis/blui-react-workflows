import React from 'react';
import { DialogProps, Dialog, Typography, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';

export type SimpleDialogProps = DialogProps & {
    title: string;
    body: string;
    onClose: () => void;
};
export const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
    const { title, body, ...dialogProps } = props;
    const { t } = useLanguageLocale();

    return (
        <Dialog disableBackdropClick {...dialogProps}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ flex: '1 1 auto', overflow: 'auto' }}>
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions style={{ padding: 16 }}>
                <Button variant="text" color="primary" onClick={dialogProps.onClose} style={{ width: 100 }}>
                    {t('ACTIONS.OKAY')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
