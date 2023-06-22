import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defaultPasswordRequirements } from '../../constants';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';
import { ChangePasswordDialogProps } from './types';

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = () => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');
    const { actions, navigate, routeConfig } = useAuthContext();

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
        if (checkPasswords)
            // eslint-disable-next-line no-console
            console.log(passwordInput, currentInput);
    };

    return (
        <ChangePasswordDialogBase
            open={true}
            dialogTitle={t('bluiAuth:CHANGE_PASSWORD.PASSWORD')}
            dialogDescription={t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO')}
            currentPasswordLabel={t('bluiCommon:LABELS.CURRENT_PASSWORD')}
            previousLabel={t('bluiCommon:ACTIONS.BACK')}
            nextLabel={t('bluiCommon:ACTIONS.OKAY')}
            currentPasswordChange={currentPasswordChange}
            enableButton={checkPasswords}
            PasswordProps={{
                newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
                confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
                onPasswordChange: updateFields,
                passwordRef: passwordRef,
                confirmRef: confirmRef,
                initialNewPasswordValue: passwordInput,
                initialConfirmPasswordValue: confirmInput,
                passwordRequirements: passwordRequirements,
            }}
        />
    );
};
