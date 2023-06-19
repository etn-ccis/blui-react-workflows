import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    defaultPasswordRequirements,
    useLanguageLocale,
    CreatePasswordScreenBase,
} from '@brightlayer-ui/react-auth-workflow';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Spacer } from '@brightlayer-ui/react-components';
export const CreatePasswordScreenTest = (): JSX.Element => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const navigate = useNavigate();
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');

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
                        Create Password Screen
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
                <CreatePasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Create Password' }}
                    WorkflowCardInstructionProps={{
                        instructions:
                            'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
                    }}
                    PasswordProps={{
                        passwordRef: passwordRef,
                        confirmRef: confirmRef,
                        initialNewPasswordValue: passwordInput,
                        initialConfirmPasswordValue: confirmInput,
                        passwordRequirements: passwordRequirements,
                        newPasswordLabel: 'Password',
                        confirmPasswordLabel: 'Confirm Password',
                        onPasswordChange: updateFields,
                        onSubmit: (): void => {
                            console.error('submitting form...');
                        },
                    }}
                    WorkflowCardActionsProps={{
                        showNext: true,
                        nextLabel: 'Next',
                        canGoNext: passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput,
                        showPrevious: true,
                        previousLabel: 'Back',
                        canGoPrevious: true,
                        currentStep: 2,
                        totalSteps: 6,
                    }}
                />
            </Box>
        </Box>
    );
};
