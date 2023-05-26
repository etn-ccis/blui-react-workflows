import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    defaultPasswordRequirements,
    SetPassword,
    useLanguageLocale,
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardActions,
    WorkflowCardBody,
    WorkflowCardInstructions,
} from '@brightlayer-ui/react-auth-workflow';
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
        <WorkflowCard>
            <WorkflowCardHeader title="Create Password" />
            <WorkflowCardInstructions
                sx={{ px: 3 }}
                divider
                instructions="Please select a password. Make sure that your password meets the necessary complexity requirements outlined below."
            />
            <WorkflowCardBody>
                <SetPassword
                    passwordRef={passwordRef}
                    confirmRef={confirmRef}
                    initialNewPasswordValue={passwordInput}
                    initialConfirmPasswordValue={confirmInput}
                    onPasswordChange={updateFields}
                    onSubmit={(): void => {}}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                fullWidthButton
                previousLabel="Go to / route"
                onPrevious={(): void => navigate('/')}
            />
        </WorkflowCard>
    );
};
