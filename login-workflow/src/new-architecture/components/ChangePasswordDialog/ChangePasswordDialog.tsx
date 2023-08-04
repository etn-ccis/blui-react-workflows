import React, { useCallback, useRef, useState } from 'react';
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

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const checkPasswords =
        currentInput !== '' && passwordInput !== '' && confirmInput !== '' && passwordInput === confirmInput;

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions().changePassword(currentInput, passwordInput);
            } catch {
                setShowErrorDialog(true);
            } finally {
                setIsLoading(false);
            }
        }
    }, [checkPasswords, currentInput, passwordInput, actions, setIsLoading, setShowErrorDialog]);

    const {
        open,
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious = (): void => navigate('/'),
        PasswordProps,
        ErrorDialogProps,
    } = props;

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordRef,
        confirmRef,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        passwordRequirements,
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        ...PasswordProps,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: (): void => {
            void changePasswordSubmit();
            PasswordProps?.onSubmit?.();
        },
    };

    const errorDialogProps = {
        open: showErrorDialog,
        title: t('bluiCommon:MESSAGES.ERROR'),
        body: t('bluiAuth:CHANGE_PASSWORD.PROBLEM_OCCURRED'),
        dismissButtonText: t('bluiCommon:ACTIONS.OKAY'),
        ...ErrorDialogProps,
        onClose: (): void => setShowErrorDialog(false),
    };

    return (
        <ChangePasswordDialogBase
            open={open}
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
            PasswordProps={passwordProps}
            ErrorDialogProps={errorDialogProps}
        />
    );
};
