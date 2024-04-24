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
 * @param {ChangePasswordDialogProps} props - props of changePassword dailog base component
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
        currentPasswordTextFieldProps,
        showSuccessScreen,
        slots,
        slotProps,
    } = props;
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentPassword, setCurrentPassword] = useState('');
    const [buttonState, setButtonState] = useState(true);

    const handleChange = (event: any): void => {
        const { value } = event.target;
        setCurrentPassword(value);
        currentPasswordChange?.(value);
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
            <SuccessScreenBase
                WorkflowCardBaseProps={{
                    sx: {
                        height: matchesMD ? (matchesSM ? '100vh' : '62vh') : '70vh',
                    },
                }}
                {..._props}
            />
        );

    return (
        <Dialog sx={sx} fullScreen={matchesSM} open={open} maxWidth={'xs'}>
            <Spinner data-testid="blui-spinner" visible={loading} />
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
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
                            pb: { xs: 2, md: 3 },
                            px: { xs: 2, md: 3 },
                        }}
                    >
                        <Typography sx={{ px: { xs: 1, sm: 0 } }}>{dialogDescription}</Typography>
                        <Divider sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }} />
                        <SetPassword {...PasswordProps}>
                            <PasswordTextField
                                sx={{
                                    mb: { xs: 3, md: 4 },
                                }}
                                id="current-password"
                                label={currentPasswordLabel}
                                value={currentPassword}
                                {...currentPasswordTextFieldProps}
                                onChange={(e): void => {
                                    // eslint-disable-next-line no-unused-expressions
                                    currentPasswordTextFieldProps?.onChange &&
                                        currentPasswordTextFieldProps.onChange(e);
                                    handleChange(e);
                                }}
                                onKeyUp={(e): void => {
                                    if (e.key === 'Enter' && PasswordProps?.passwordRef?.current) {
                                        PasswordProps?.passwordRef.current.focus();
                                    }
                                }}
                            />
                        </SetPassword>
                    </DialogContent>
                    <Divider />
                    <DialogActions
                        sx={{
                            justifyContent: 'flex-end',
                            p: { xs: 2, md: 3 },
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
                                onClick={(): void => {
                                    void onSubmit?.();
                                }}
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
