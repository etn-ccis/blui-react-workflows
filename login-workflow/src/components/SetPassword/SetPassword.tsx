import React, { ChangeEvent, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { TextFieldStyles } from '../../styles';
import { SetPasswordProps } from './types';
import { PasswordTextField } from '../PasswordTextField';
import { PasswordRequirements } from '../PasswordRequirements';

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param onPasswordChange called when the new password or confirm new password fields value changes
 * @param initialNewPasswordValue initial value for the new password field
 * @param initialConfirmPasswordValue initial value for the confirm password field
 * @param passwordRequirements requirements to set password
 * @param newPasswordLabel label for the new password field (default = 'Password')
 * @param confirmPasswordLabel label for the confirm password field (default = 'Confirm')
 * @param passwordRef ref to forward to the password input.
 * @param confirmRef ref to forward to the confirm password input.
 * @param passwordNotMatchError text for showing message when passwords do not match.
 * @param onSubmit function to call when the form is submitted
 * @param passwordTextFieldProps props to pass to the password field.
 * @param confirmPasswordTextFieldProps props to pass to the confirm password field.
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
        passwordTextFieldProps,
        confirmPasswordTextFieldProps,
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
            onPasswordChange?.({ password: newPassword, confirm: confirmInput });
        },
        [setPasswordInput, onPasswordChange, confirmInput]
    );

    const onConfirmChange = useCallback(
        (newConfirm: any) => {
            setConfirmInput(newConfirm);
            onPasswordChange?.({ password: passwordInput, confirm: newConfirm });
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
            <PasswordTextField
                id="password"
                data-testid="password"
                name="password"
                inputRef={passwordRef}
                label={newPasswordLabel}
                value={passwordInput}
                error={shouldValidatePassword && !isValidPassword()}
                sx={TextFieldStyles(theme)}
                {...passwordTextFieldProps}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onPassChange(evt.target.value)}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && confirmRef.current) {
                        confirmRef.current.focus();
                    }
                }}
                onBlur={(): void => setShouldValidatePassword(true)}
            />
            {passwordRequirements && passwordRequirements.length > 0 && (
                <PasswordRequirements
                    sx={{ mt: 2 }}
                    passwordText={passwordInput}
                    passwordRequirements={passwordRequirements}
                />
            )}
            <PasswordTextField
                id="confirm"
                data-testid="confirm"
                name="confirm"
                inputRef={confirmRef}
                label={confirmPasswordLabel}
                sx={TextFieldStyles(theme)}
                value={confirmInput}
                error={hasConfirmPasswordError()}
                helperText={hasConfirmPasswordError() ? passwordNotMatchError : ''}
                icon={
                    confirmInput.length !== 0 && isValidPassword() && confirmInput === passwordInput ? (
                        <CheckCircleOutlinedIcon data-testid="check" color="success" />
                    ) : undefined
                }
                {...confirmPasswordTextFieldProps}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => onConfirmChange(evt.target.value)}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                onBlur={(): void => setShouldValidateConfirmPassword(true)}
            />
        </>
    );
};
