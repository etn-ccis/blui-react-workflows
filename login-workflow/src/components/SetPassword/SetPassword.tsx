import React, { ChangeEvent, useState, useCallback } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { SetPasswordProps } from './types';
import { PasswordTextField } from '../PasswordTextField';
import { PasswordRequirements } from '../PasswordRequirements';

/**
 * Component that renders a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param {SetPasswordProps} props - props of setPassword component
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

    // Local State
    const [passwordInput, setPasswordInput] = useState(initialNewPasswordValue);
    const [confirmInput, setConfirmInput] = useState(initialConfirmPasswordValue);
    const [shouldValidateConfirmPassword, setShouldValidateConfirmPassword] = useState(
        initialConfirmPasswordValue ? true : false
    );
    const [shouldValidatePassword, setShouldValidatePassword] = useState(initialNewPasswordValue ? true : false);

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
        if (passwordRequirements?.length)
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
                sx={{
                    mt: { md: 4, sm: 3 },
                }}
                {...passwordTextFieldProps}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                    // eslint-disable-next-line no-unused-expressions
                    passwordTextFieldProps?.onChange && passwordTextFieldProps.onChange(evt);
                    onPassChange(evt.target.value);
                }}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && confirmRef?.current) {
                        confirmRef.current.focus();
                    }
                }}
                onBlur={(e): void => {
                    // eslint-disable-next-line no-unused-expressions
                    passwordTextFieldProps?.onBlur && passwordTextFieldProps.onBlur(e);
                    setShouldValidatePassword(true);
                }}
            />
            {passwordRequirements && passwordRequirements.length > 0 && (
                <PasswordRequirements
                    sx={{ mt: { xs: 2 }, mb: { xs: 2 } }}
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
                value={confirmInput}
                error={hasConfirmPasswordError()}
                helperText={hasConfirmPasswordError() ? passwordNotMatchError : ''}
                icon={
                    confirmInput.length !== 0 && isValidPassword() && confirmInput === passwordInput ? (
                        <CheckCircleOutlinedIcon data-testid="check" color="success" />
                    ) : undefined
                }
                {...confirmPasswordTextFieldProps}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => {
                    // eslint-disable-next-line no-unused-expressions
                    confirmPasswordTextFieldProps?.onChange && confirmPasswordTextFieldProps.onChange(evt);
                    onConfirmChange(evt.target.value);
                }}
                onKeyUp={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                onBlur={(e): void => {
                    // eslint-disable-next-line no-unused-expressions
                    confirmPasswordTextFieldProps?.onBlur && confirmPasswordTextFieldProps.onBlur(e);
                    setShouldValidateConfirmPassword(true);
                }}
            />
        </>
    );
};
