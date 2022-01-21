import React, { ChangeEvent, useState, useCallback, MutableRefObject } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useTheme from '@material-ui/core/styles/useTheme';
import { SecureTextField } from '../SecureTextField';
import { PasswordRequirements } from './PasswordRequirements';
import { useDialogStyles } from '../../styles';

export type ChangePasswordFormProps = {
    onPasswordChange: (passwords: { password: string; confirm: string }) => void;
    initialPassword?: string;
    initialConfirm?: string;
    passwordLabel?: string;
    confirmLabel?: string;
    description?: string;
    passwordRef?: MutableRefObject<any>;
    confirmRef?: MutableRefObject<any>;
    onSubmit?: () => void;
};

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange Fired when the new password or confirm new password fields value changes
 * @param initialPassword Value to initialize the password field
 * @param initialConfirm Value to initialize the confirm field
 * @param passwordLabel Optional label for the new password field (default = 'Password')
 * @param confirmLabel Optional label for the confirm password field (default = 'Confirm')
 * @param description Optional text to replace the instructional text above the password fields.
 * @param passwordRef Optional ref to forward to the password input.
 * @param confirmRef Optional ref to forward to the confirm password input.
 * @param onSubmit Optional callback function to call when the mini form is submitted.
 *
 * @category Component
 */
export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props) => {
    const {
        onPasswordChange,
        initialPassword = '',
        initialConfirm = '',
        passwordLabel,
        confirmLabel,
        description,
        children,
        passwordRef,
        confirmRef,
        onSubmit,
    } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const sharedClasses = useDialogStyles();

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialPassword);
    const [confirmInput, setConfirmInput] = useState(initialConfirm);

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
            <Typography>{description || t('blui:CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>

            <Divider className={sharedClasses.fullDivider} />

            {children}
            <SecureTextField
                id="password"
                name="password"
                inputRef={passwordRef}
                label={passwordLabel || t('blui:FORMS.PASSWORD')}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                className={sharedClasses.textField}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && confirmRef.current) {
                        confirmRef.current.focus();
                    }
                }}
            />
            <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                inputRef={confirmRef}
                label={confirmLabel || t('blui:FORMS.CONFIRM_PASSWORD')}
                className={sharedClasses.textField}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
            />
        </>
    );
};
