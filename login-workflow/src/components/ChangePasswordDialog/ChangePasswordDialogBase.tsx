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
import { Spinner } from '../../components';
import { SuccessScreenBase, SuccessScreenProps } from '../../screens';

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param dialogTitle title to display in the dialog
 * @param dialogDescription description to display in the dialog
 * @param currentPasswordLabel label to display for the current password field
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param currentPasswordChange called when the current password field changes
 * @param enableButton boolean to enable and disable the button
 * @param onSubmit callback function to call when the form is submitted
 * @param onPrevious called when the previous button is clicked
 * @param sx styles passed to the underlying root component
 * @param loading boolean that indicates whether the loading spinner should be displayed
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ChangePasswordDialog SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
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
        showSuccessScreen,
        slots,
        slotProps,
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

    const getSuccessScreen = (
        _props: SuccessScreenProps,
        SuccessScreen?: (props: SuccessScreenProps) => JSX.Element
    ): JSX.Element =>
        SuccessScreen ? (
            SuccessScreen(_props)
        ) : (
            <SuccessScreenBase WorkflowCardBaseProps={{ sx: { height: '70vh' } }} {..._props} />
        );

    return (
        <Dialog sx={sx} fullScreen={matchesSM} open={open} maxWidth={'xs'}>
            <Spinner data-testid="blui-spinner" visible={loading} />
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen, slots?.SuccessScreen)
            ) : (
                <>
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
                                onKeyUp={(e): void => {
                                    const { current } = PasswordProps.passwordRef;
                                    if (e.key === 'Enter' && current) {
                                        current.focus();
                                    }
                                }}
                            />
                        </SetPassword>
                    </DialogContent>
                    <Divider />
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
                </>
            )}
        </Dialog>
    );
};
