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
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        setPasswordInput(areValidMatchingPasswords() ? passwordInput : '');
    }, [setPasswordInput, passwordInput, confirmInput, areValidMatchingPasswords]);

    const checkPasswords =
        passwordInput !== '' && confirmInput !== '' && currentInput !== '' && passwordInput === confirmInput;

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions().changePassword(currentInput, passwordInput);
            } catch {
                setShowErrorDialog(true);
            }
            setIsLoading(false);
        }
    }, [checkPasswords, currentInput, passwordInput, actions, setIsLoading, setShowErrorDialog]);

    const {
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious = (): void => navigate(routeConfig.LOGIN),
        PasswordProps = {
            newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
            confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
            onPasswordChange: updateFields,
            passwordRef,
            confirmRef,
            initialNewPasswordValue: passwordInput,
            initialConfirmPasswordValue: confirmInput,
            passwordRequirements,
            onSubmit: (): void => void changePasswordSubmit(),
            passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        },
        ErrorDialogProps = {
            open: showErrorDialog,
            title: t('bluiCommon:MESSAGES.ERROR'),
            body: t('bluiAuth:CHANGE_PASSWORD.PROBLEM_OCCURRED'),
            onClose: (): void => setShowErrorDialog(false),
            dismissButtonText: t('bluiCommon:ACTIONS.OKAY'),
        },
    } = props;

    return (
        <ChangePasswordDialogBase
            open={true}
            loading={isLoading}
            dialogTitle={dialogTitle}
            dialogDescription={dialogDescription}
            currentPasswordLabel={currentPasswordLabel}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            currentPasswordChange={(currentPwd): void => setCurrentInput(currentPwd)}
            enableButton={checkPasswords}
            onPrevious={onPrevious}
            onSubmit={(): void => {
                void changePasswordSubmit();
            }}
            PasswordProps={PasswordProps}
            ErrorDialogProps={ErrorDialogProps}
        />
    );
};
