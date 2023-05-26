import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    defaultPasswordRequirements,
    SetPassword,
    useLanguageLocale,
    WorkflowCard,
} from '@brightlayer-ui/react-auth-workflow';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export const SetPasswordScreen: React.FC<React.PropsWithChildren<any>> = () => {
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
        <>
            <WorkflowCard>
                <SetPassword
                    passwordRef={passwordRef}
                    confirmRef={confirmRef}
                    initialNewPasswordValue={passwordInput}
                    initialConfirmPasswordValue={confirmInput}
                    onPasswordChange={updateFields}
                    onSubmit={(): void => {}}
                />
            </WorkflowCard>
            <Button variant="contained" sx={{ width: 200 }} onClick={(): void => navigate('/')}>
                Go to / route
            </Button>
        </>
    );
};
