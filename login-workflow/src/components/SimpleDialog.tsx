import React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useLanguageLocale } from '../auth-shared';
import { useTheme } from '@mui/material/styles';
import { DialogButtonStyles, DialogActionsStyles, DialogContentStyles, DialogTitleStyles } from '../styles';

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
export const SimpleDialog: React.FC<React.PropsWithChildren<React.PropsWithChildren<SimpleDialogProps>>> = (props) => {
    const { title, body, ...dialogProps } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    return (
        <Dialog data-testid="blui-simple-dialog" {...dialogProps}>
            <DialogTitle sx={DialogTitleStyles(theme)}>{title}</DialogTitle>
            <DialogContent sx={{ ...DialogContentStyles(theme), flex: '1 1 auto' }}>
                <Typography>{body}</Typography>
            </DialogContent>
            <DialogActions sx={DialogActionsStyles(theme)}>
                <Button variant="text" color="primary" onClick={dialogProps.onClose} sx={DialogButtonStyles()}>
                    {t('bluiCommon:ACTIONS.OKAY').toUpperCase()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
