import React, { ChangeEvent, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { PasswordRequirements, SecureTextField } from '../../../components';
import { TextFieldStyles } from '../../../styles';
import { SetPasswordProps } from './types';

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange Fired when the new password or confirm new password fields value changes
 * @param initialNewPasswordValue to initialize the password field
 * @param initialConfirmPasswordValue to initialize the confirm field
 * @param passwordRequirements Optional requirements to set password
 * @param newPasswordLabel Optional label for the new password field (default = 'Password')
 * @param confirmPasswordLabel Optional label for the confirm password field (default = 'Confirm')
 * @param passwordRef Optional ref to forward to the password input.
 * @param confirmRef Optional ref to forward to the confirm password input.
 * @param passwordNotMatchError Optional text for showing message when passwords not match.
 * @param onSubmit Optional callback function to call when the mini form is submitted.
 *
 * @category Component
 */
export const SetPassword: React.FC<React.PropsWithChildren<SetPasswordProps>> = (props) => {
    const {
        newPasswordLabel,
        initialNewPasswordValue = '',
        confirmPasswordLabel,
        initialConfirmPasswordValue = '',
        passwordRequirements,
        onPasswordChange,
        children,
        passwordRef,
        confirmRef,
        passwordNotMatchError,
        onSubmit,
    } = props;
    const theme = useTheme();

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialNewPasswordValue);
    const [confirmInput, setConfirmInput] = useState(initialConfirmPasswordValue);
    const [shouldValidateConfirmPassword, setShouldValidateConfirmPassword] = useState(false);
    const [shouldValidatePassword, setShouldValidatePassword] = useState(false);

    const onPassChange = useCallback(
        (newPassword: any) => {
            setPasswordInput(newPassword);
            onPasswordChange({ password: newPassword, confirm: confirmInput });
        },
        [setPasswordInput, onPasswordChange, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm: any) => {
            setConfirmInput(newConfirm);
            onPasswordChange({ password: passwordInput, confirm: newConfirm });
        },
        [setConfirmInput, onPasswordChange, passwordInput]
    );

    const hasConfirmPasswordError = useCallback(
        (): boolean => shouldValidateConfirmPassword && confirmInput.length !== 0 && confirmInput !== passwordInput,
        [shouldValidateConfirmPassword, confirmInput, passwordInput]
    );

    const isValidPassword = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return true;
    }, [passwordRequirements, passwordInput]);

    return (
        <>
            {children}
            <SecureTextField
                id="password"
                data-testid="password"
                name="password"
                inputRef={passwordRef}
                label={newPasswordLabel}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                sx={TextFieldStyles(theme)}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && confirmRef.current) {
                        confirmRef.current.focus();
                    }
                }}
                error={shouldValidatePassword && !isValidPassword()}
                onBlur={(): void => setShouldValidatePassword(true)}
            />
            {passwordRequirements && passwordRequirements.length > 0 && (
                <PasswordRequirements
                    sx={{ mt: 2 }}
                    passwordText={passwordInput}
                    passwordRequirements={passwordRequirements}
                />
            )}
            <SecureTextField
                id="confirm"
                data-testid="confirm"
                name="confirm"
                inputRef={confirmRef}
                label={confirmPasswordLabel}
                sx={TextFieldStyles(theme)}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                error={hasConfirmPasswordError()}
                helperText={hasConfirmPasswordError() ? passwordNotMatchError : ''}
                icon={
                    confirmInput.length !== 0 && confirmInput === passwordInput ? (
                        <CheckCircleOutlinedIcon data-testid="check" color="success" />
                    ) : undefined
                }
                onBlur={(): void => setShouldValidateConfirmPassword(true)}
            />
        </>
    );
};
