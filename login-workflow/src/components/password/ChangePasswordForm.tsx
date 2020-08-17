import React, { ChangeEvent, useState, useCallback } from 'react';
import { Typography, Divider, useTheme } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { SecureTextField } from '../SecureTextField';
import { PasswordRequirements } from './PasswordRequirements';

export type ChangePasswordFormProps = {
    onPasswordChange: (passwords: { password: string; confirm: string }) => void;
    passwordLabel?: string;
    confirmLabel?: string;
    description?: string;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
    const { onPasswordChange, passwordLabel, confirmLabel, description, children } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

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

            <Divider style={{ margin: '32px 0' }} />

            {children}
            <SecureTextField
                id="password"
                name="password"
                label={passwordLabel || t('FORMS.PASSWORD')}
                // className={classes.formFields}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                // error={hasTransitError}
                // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
            />
            <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                label={confirmLabel || t('FORMS.CONFIRM_PASSWORD')}
                // className={classes.formFields}
                style={{ marginTop: theme.spacing(2) }}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                // error={hasTransitError}
                // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
            />
        </>
    );
};
