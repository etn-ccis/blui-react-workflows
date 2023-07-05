import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    ResetPasswordScreenBase,
    defaultPasswordRequirements,
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-workflow';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Spacer } from '@brightlayer-ui/react-components';
import { CheckCircle } from '@mui/icons-material';

export const ResetPasswordScreen = (): JSX.Element => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const navigate = useNavigate();
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    const passwordRequirements = defaultPasswordRequirements(t);
    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    <Typography variant={'h6'} color={'inherit'}>
                        Reset Password Screen
                    </Typography>
                    <Spacer />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ width: 200 }}
                        onClick={(): void => navigate('/login')}
                    >
                        Go Login Route
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: '1 1 0px' }}>
                <ResetPasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Reset Password' }}
                    WorkflowCardInstructionProps={{
                        instructions:
                            'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
                    }}
                    PasswordProps={{
                        passwordRef: passwordRef,
                        newPasswordLabel: 'New Password',
                        confirmPasswordLabel: 'Confirm New Password',
                        confirmRef: confirmRef,
                        initialNewPasswordValue: passwordInput,
                        initialConfirmPasswordValue: confirmInput,
                        passwordRequirements: passwordRequirements,
                        passwordNotMatchError: 'Passwords do not match',
                        onPasswordChange: updateFields,
                        onSubmit: (): void => {
                            if (passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput) {
                                // eslint-disable-next-line no-console
                                console.log('submitting form...');
                                setShowSuccessScreen(true);
                            }
                        },
                    }}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
                        onNext: (): void => {
                            setShowSuccessScreen(true);
                        },
                        showPrevious: true,
                        previousLabel: 'Back',
                    }}
                    // slots={{
                    //     // eslint-disable-next-line
                    //     SuccessScreen: (): JSX.Element => (
                    //         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    //             <Typography variant={'h6'} color={'inherit'}>
                    //                 Success Screen
                    //             </Typography>
                    //         </Box>
                    //     ),
                    // }}
                    slotProps={{
                        SuccessScreen: {
                            icon: <CheckCircle color="primary" sx={{ fontSize: 100 }} />,
                            messageTitle: 'Your password was successfully reset.',
                            message:
                                'Your password has been reset successfully. To ensure your account security, you will need to log in to the application with your updated credentials.',
                            onDismiss: (): void => {
                                // eslint-disable-next-line no-console
                                console.log('dismissing success screen...');
                                navigate('/login');
                            },
                            WorkflowCardActionsProps: {
                                showPrevious: false,
                                fullWidthButton: true,
                                showNext: true,
                                nextLabel: 'Done',
                                onNext: (): void => {
                                    // eslint-disable-next-line no-console
                                    console.log('dismissing success screen from ActionProps...');
                                    navigate('/login');
                                },
                            },
                        },
                    }}
                    showSuccessScreen={showSuccessScreen}
                />
            </Box>
        </Box>
    );
};
