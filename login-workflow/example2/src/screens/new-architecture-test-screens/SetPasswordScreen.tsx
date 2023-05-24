import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    defaultPasswordRequirements,
    SetPassword,
    useLanguageLocale,
    AuthUIContextProvider,
    useSecurityActions,
    BrandedCardContainer,
} from '@brightlayer-ui/react-auth-workflow';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';

/**
 * Component that renders a screen displaying a form for creating a password.
 *
 * @param initialPassword value to pre-populate the password and confirmation fields
 * @param onPasswordChanged function to call when the password or confirm fields change
 * @param onSubmit function to call when the mini form is submitted
 *
 * @category Component
 */
export const SetPasswordScreen: React.FC<React.PropsWithChildren<any>> = () => {
    const { t } = useLanguageLocale();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);
    const securityContextActions = useSecurityActions();

    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');

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

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
        >
            <BrandedCardContainer>
                <SetPassword
                    passwordRef={passwordRef}
                    confirmRef={confirmRef}
                    initialNewPasswordValue={passwordInput}
                    initialConfirmPasswordValue={confirmInput}
                    onPasswordChange={updateFields}
                    onSubmit={(): void => {}}
                />
            </BrandedCardContainer>
        </AuthUIContextProvider>
    );
};
