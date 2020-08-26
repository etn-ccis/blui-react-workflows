import React, { ChangeEvent, useState, useCallback } from 'react';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { Typography, Divider, useTheme } from '@material-ui/core';
import { SecureTextField } from '../SecureTextField';
import { PasswordRequirements } from './PasswordRequirements';
import { useDialogStyles } from '../../styles';

export type ChangePasswordFormProps = {
    onPasswordChange: (passwords: { password: string; confirm: string }) => void;
    passwordLabel?: string;
    confirmLabel?: string;
    description?: string;
};

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange Fired when the new password or confirm new password fields value changes
 * @param passwordLabel Optional label for the new password field (default = 'Password')
 * @param confirmLabel Optional label for the confirm password field (default = 'Confirm')
 * @param description Optional text to replace the instructional text above the password fields.
 *
 * @category Component
 */
export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
    const { onPasswordChange, passwordLabel, confirmLabel, description, children } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const sharedClasses = useDialogStyles();

    // Local State
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');

    const onPassChange = useCallback(
        (newPassword) => {
            setPasswordInput(newPassword);
            onPasswordChange({ password: newPassword, confirm: confirmInput });
        },
        [setPasswordInput, onPasswordChange, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm) => {
            setConfirmInput(newConfirm);
            onPasswordChange({ password: passwordInput, confirm: newConfirm });
        },
        [setConfirmInput, onPasswordChange, passwordInput]
    );

    return (
        <>
            <Typography>{description || t('CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>

            <Divider className={sharedClasses.fullDivider} />

            {children}
            <SecureTextField
                id="password"
                name="password"
                label={passwordLabel || t('FORMS.PASSWORD')}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                className={sharedClasses.textField}
            />
            <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                label={confirmLabel || t('FORMS.CONFIRM_PASSWORD')}
                className={sharedClasses.textField}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
            />
        </>
    );
};
