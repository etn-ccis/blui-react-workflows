import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import {
    ChangePasswordDialogBase,
    defaultPasswordRequirements,
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-workflow';

export const ChangePasswordDialogTest: React.FC<React.PropsWithChildren> = () => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const currentPwdRef = createRef();
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');

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

    return (
        <ChangePasswordDialogBase
            open={true}
            PasswordProps={{
                passwordRef: passwordRef,
                confirmRef: confirmRef,
                initialNewPasswordValue: passwordInput,
                initialConfirmPasswordValue: confirmInput,
                onPasswordChange: updateFields,
                onSubmit: (): void => {
                    // eslint-disable-next-line no-console
                    console.log('submitting form...');
                },
            }}
            enableButton={
                passwordInput !== '' && confirmInput !== '' && currentInput !== '' && passwordInput === confirmInput
            }
            onSubmit={(): void => {
                // eslint-disable-next-line no-console
                console.log('Clicked');
            }}
            currentPasswordChange={currentPasswordChange}
            currentPwdRef={currentPwdRef}
        />
    );
};
