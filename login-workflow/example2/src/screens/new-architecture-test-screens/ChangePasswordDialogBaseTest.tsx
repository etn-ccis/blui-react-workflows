import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import {
    ChangePasswordDialogBase,
    defaultPasswordRequirements,
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';

export const ChangePasswordDialogBaseTest: React.FC<PropsWithChildren> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');

    // Error dialog state
    const [showErrorDialog, setShowErrorDialog] = useState(false);

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

    const currentPasswordChange = (currentPwd: string): void => {
        setCurrentInput(currentPwd);
    };

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    const checkPasswords =
        passwordInput !== '' && confirmInput !== '' && currentInput !== '' && passwordInput === confirmInput;

    const changePasswordSubmit = (): void => {
        if (checkPasswords) setShowErrorDialog(true);
    };

    return (
        <ChangePasswordDialogBase
            dialogTitle="Change Password"
            dialogDescription="Please select a password. Make sure that your password meets the necessary complexity requirements outlined below."
            currentPasswordLabel="Current Password"
            previousLabel="Back"
            nextLabel="Okay"
            enableButton={checkPasswords}
            onSubmit={changePasswordSubmit}
            currentPasswordChange={currentPasswordChange}
            onPrevious={(): void => navigate('/login')}
            passwordProps={{
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                passwordRef: passwordRef,
                confirmRef: confirmRef,
                initialNewPasswordValue: passwordInput,
                initialConfirmPasswordValue: confirmInput,
                onPasswordChange: updateFields,
                onSubmit: changePasswordSubmit,
                passwordRequirements: passwordRequirements,
                passwordNotMatchError: 'Passwords do not match',
            }}
            errorDialogProps={{
                open: showErrorDialog,
                title: 'Error!',
                body: 'Please check the error and proceed further',
                onClose: (): void => {
                    setShowErrorDialog(!showErrorDialog);
                },
            }}
        />
    );
};
