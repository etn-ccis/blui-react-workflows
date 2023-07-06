import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ChangePasswordDialogProps } from './types';
import { SetPassword } from '../SetPassword';
import { PasswordTextField } from '../PasswordTextField';
import { BasicDialog } from '../Dialog';
import { Spinner } from '../../../components';

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param dialogTitle Optional title for the DialogTitle component (default = 'Change Password')
 * @param dialogDescription Optional description inside the DialogContent component (default = 'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.')
 * @param currentPasswordLabel Optional label for the current password field (default = 'Current Password')
 * @param previousLabel Optional label for the Back button (default = 'Back')
 * @param nextLabel Optional label for the Next button (default = 'Okay')
 * @param currentPasswordChange Callback function that fire when the current password field value changes
 * @param enableButton Flag to enable and disable the Okay button
 * @param onSubmit Callback function that fire when form gets validated or clicked on the enabled Okay button.
 *
 * @category Component
 */

export const ChangePasswordDialogBase: React.FC<ChangePasswordDialogProps> = (props) => {
    const {
        open,
        dialogTitle,
        dialogDescription,
        currentPasswordLabel,
        previousLabel,
        nextLabel,
        sx,
        enableButton,
        currentPasswordChange,
        onSubmit,
        onPrevious,
        ErrorDialogProps,
        PasswordProps,
        loading,
    } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentPassword, setCurrentPassword] = useState('');
    const [buttonState, setButtonState] = useState(true);

    const handleChange = (event: any): void => {
        const { value } = event.target;
        setCurrentPassword(value);
        currentPasswordChange(value);
    };

    useEffect(() => {
        setButtonState(!enableButton);
    }, [enableButton]);

    return (
        <Dialog sx={sx} fullScreen={matchesSM} open={open} maxWidth={'xs'}>
            <Spinner data-testid="blui-spinner" visible={loading} />
            <BasicDialog {...ErrorDialogProps} />
            <DialogTitle
                sx={{
                    pt: { md: 4, sm: 2 },
                    px: { md: 3, sm: 2 },
                    pb: 0,
                }}
            >
                {dialogTitle}
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
                <Typography>{dialogDescription}</Typography>
                <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} />
                <SetPassword {...PasswordProps}>
                    <PasswordTextField
                        id="current-password"
                        label={currentPasswordLabel}
                        value={currentPassword}
                        onChange={handleChange}
                        onKeyPress={(e): void => {
                            const { current } = PasswordProps.passwordRef;
                            if (e.key === 'Enter' && current) {
                                current.focus();
                            }
                        }}
                    />
                </SetPassword>
            </DialogContent>
            <Divider sx={{ mt: 2 }} />
            <DialogActions
                sx={{
                    justifyContent: 'flex-end',
                    p: { md: 3, sm: 2 },
                }}
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <Button variant="outlined" color="primary" sx={{ width: 100 }} onClick={onPrevious}>
                        {previousLabel}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ width: 100 }}
                        disabled={buttonState}
                        color="primary"
                        onClick={onSubmit}
                    >
                        {nextLabel}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};
