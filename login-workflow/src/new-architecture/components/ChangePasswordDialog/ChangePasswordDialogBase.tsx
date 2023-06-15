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
        dialogTitle = 'Change Password',
        dialogDescription = 'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
        currentPasswordLabel = 'Current Password',
        previousLabel = 'Back',
        nextLabel = 'Okay',
        sx,
        open,
        enableButton,
        currentPasswordChange,
        onSubmit,
    } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentPassword, setCurrentPassword] = useState('');
    const [buttonState, setButtonState] = useState(true);

    const passwordProps = props.PasswordProps;

    const handleChange = (event: any): void => {
        setCurrentPassword(event.target.value);
        currentPasswordChange(event.target.value);
    };

    useEffect(() => {
        setButtonState(!enableButton);
    }, [enableButton]);

    return (
        <Dialog fullScreen={matchesSM ? true : false} open={open} maxWidth={'xs'}>
            <DialogTitle
                sx={[
                    {
                        pt: { md: 4, sm: 2 },
                        px: { md: 3, sm: 2 },
                        pb: 0,
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {dialogTitle}
            </DialogTitle>
            <DialogContent
                sx={[
                    {
                        flex: '1 1 auto',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        pt: 2,
                        px: { md: 3, sm: 2 },
                        pb: { md: 2, sm: 3 },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                <Typography>{dialogDescription}</Typography>
                <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} />
                <SetPassword {...passwordProps}>
                    <PasswordTextField
                        id="current-password"
                        label={currentPasswordLabel}
                        value={currentPassword}
                        onChange={handleChange}
                        onKeyPress={(e): void => {
                            if (e.key === 'Enter' && passwordProps.passwordRef.current) {
                                passwordProps.passwordRef.current.focus();
                            }
                        }}
                    />
                </SetPassword>
            </DialogContent>
            <Divider sx={{ mt: 2 }} />
            <DialogActions
                sx={[
                    {
                        justifyContent: 'flex-end',
                        p: { md: 3, sm: 2 },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <Button variant="outlined" color="primary" sx={{ width: 100 }}>
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
