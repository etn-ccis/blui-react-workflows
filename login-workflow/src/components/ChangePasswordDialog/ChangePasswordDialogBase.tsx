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
import { Spinner } from '../../components';
import { SuccessScreenBase, SuccessScreenProps } from '../../screens';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { ChangePasswordDialogClassKey, getChangePasswordDialogUtilityClass } from './utilityClasses';
import ErrorManager from '../Error/ErrorManager';

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param {ChangePasswordDialogProps} props - props of changePassword dailog base component
 *
 * @category Component
 */
const useUtilityClasses = (ownerState: ChangePasswordDialogProps): Record<ChangePasswordDialogClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        root: ['root'],
        spinner: ['spinner'],
        title: ['title'],
        content: ['content'],
        description: ['description'],
        divider: ['divider'],
        previousLabelButton: ['previousLabelButton'],
        nextLabelButton: ['nextLabelButton'],
        buttonAction: ['buttonAction'],
    };

    return composeClasses(slots, getChangePasswordDialogUtilityClass, classes);
};
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
        PasswordProps,
        loading,
        currentPasswordTextFieldProps,
        showSuccessScreen,
        slots,
        slotProps,
        errorDisplayConfig,
    } = props;
    const defaultClasses = useUtilityClasses(props);
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
        <Dialog
            sx={sx}
            fullScreen={matchesSM}
            open={open}
            maxWidth={'xs'}
            className={defaultClasses.root}
            data-testid={defaultClasses.root}
        >
            <Spinner data-testid="blui-spinner" visible={loading} className={defaultClasses.spinner} />
            {showSuccessScreen ? (
                getSuccessScreen(slotProps?.SuccessScreen || {}, slots?.SuccessScreen)
            ) : (
                <>
                    <DialogTitle
                        sx={{
                            pt: { md: 4, sm: 2 },
                            px: { md: 3, sm: 2 },
                            pb: 0,
                        }}
                        className={defaultClasses.title}
                        data-testid={defaultClasses.title}
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
                        className={defaultClasses.content}
                        data-testid={defaultClasses.content}
                    >
                        <ErrorManager {...errorDisplayConfig}>
                            <Typography
                                sx={{ px: { xs: 1, sm: 0 } }}
                                className={defaultClasses.description}
                                data-testid={defaultClasses.description}
                            >
                                {dialogDescription}
                            </Typography>
                            <Divider
                                sx={{ mt: 5, mb: 4, mx: { md: -3, xs: -2 } }}
                                className={defaultClasses.divider}
                                data-testid={defaultClasses.divider}
                            />
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
                        </ErrorManager>
                    </DialogContent>
                    <Divider />
                    <DialogActions
                        sx={{
                            justifyContent: 'flex-end',
                            p: { xs: 2, md: 3 },
                        }}
                        className={defaultClasses.buttonAction}
                        data-testid={defaultClasses.buttonAction}
                    >
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ width: 100 }}
                                onClick={onPrevious}
                                className={defaultClasses.previousLabelButton}
                                data-testid={defaultClasses.previousLabelButton}
                            >
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
                                className={defaultClasses.nextLabelButton}
                                data-testid={defaultClasses.nextLabelButton}
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
