import React, { useState, useCallback, useEffect } from 'react';
import { useLanguageLocale, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { ChangePasswordForm } from '../../components';
import { defaultPasswordRequirements } from '../../constants';

export type CreatePasswordProps = {
    onPasswordChanged: (password: string) => void;
    initialPassword?: string;
};

/**
 * Component that renders a screen displaying a form for creating a password.
 *
 * @param initialPassword value to pre-populate the password and confirmation fields
 * @param onPasswordChanged function to call when the password or confirm fields change
 *
 * @category Component
 */
export const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
    const { onPasswordChanged, initialPassword = '' } = props;
    const { t } = useLanguageLocale();

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

    return <ChangePasswordForm onPasswordChange={updateFields} />;
};
