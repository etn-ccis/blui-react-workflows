import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useInjectedUIContext, useLanguageLocale } from '../../auth-shared';
import { defaultPasswordRequirements } from '../../constants';
import { SetPassword } from '../../new-architecture/components/SetPassword';

export type CreatePasswordProps = {
    onPasswordChanged: (password: string) => void;
    initialPassword?: string;
    onSubmit?: () => void;
};

/**
 * Component that renders a screen displaying a form for creating a password.
 *
 * @param initialPassword value to pre-populate the password and confirmation fields
 * @param onPasswordChanged function to call when the password or confirm fields change
 * @param onSubmit function to call when the mini form is submitted
 *
 * @category Component
 */
export const CreatePassword: React.FC<React.PropsWithChildren<React.PropsWithChildren<CreatePasswordProps>>> = (
    props
) => {
    const { onPasswordChanged, initialPassword = 'Test', onSubmit } = props;
    const { t } = useLanguageLocale();

    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const [passwordInput, setPasswordInput] = useState(initialPassword);
    const [confirmInput, setConfirmInput] = useState(initialPassword);

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();
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
        onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onPasswordChanged, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <SetPassword
            passwordRef={passwordRef}
            confirmRef={confirmRef}
            initialNewPasswordValue={initialPassword}
            initialConfirmPasswordValue={initialPassword}
            onPasswordChange={updateFields}
            onSubmit={onSubmit}
        />
    );
};
