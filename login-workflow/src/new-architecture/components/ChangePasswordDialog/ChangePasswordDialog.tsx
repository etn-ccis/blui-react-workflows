import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defaultPasswordRequirements } from '../../constants';
import { useAuthContext } from '../../contexts';
import { useLanguageLocale } from '../../hooks';
import { ChangePasswordDialogBase } from './ChangePasswordDialogBase';
import { ChangePasswordDialogProps } from './types';

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = (props) => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
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
        if (checkPasswords) {
            try {
                void actions().changePassword(currentInput, passwordInput);
            } catch {
                setShowErrorDialog(true);
            }
        }
    };

    const {
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious = (): void => navigate(routeConfig.LOGIN),
        passwordProps = {
            newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
            confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
            onPasswordChange: updateFields,
            passwordRef,
            confirmRef,
            initialNewPasswordValue: passwordInput,
            initialConfirmPasswordValue: confirmInput,
            passwordRequirements,
            onSubmit: changePasswordSubmit,
        },
        errorDialogProps = {
            open: showErrorDialog,
            title: 'Error',
            body: 'Got an error, please try again!',
            onClose: (): void => setShowErrorDialog(false),
            dismissButtonText: 'Dismiss',
        },
    } = props;

    return (
        <ChangePasswordDialogBase
            dialogTitle={dialogTitle}
            dialogDescription={dialogDescription}
            currentPasswordLabel={currentPasswordLabel}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            currentPasswordChange={currentPasswordChange}
            enableButton={checkPasswords}
            onPrevious={onPrevious}
            onSubmit={changePasswordSubmit}
            passwordProps={passwordProps}
            errorDialogProps={errorDialogProps}
        />
    );
};
