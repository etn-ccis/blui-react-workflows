import React, { useState, useCallback, ChangeEvent } from 'react';
import { Typography, Divider, useTheme } from '@material-ui/core';
import { useLanguageLocale, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { SecureTextField } from '../../components/SecureTextField';
import { PasswordRequirements } from '../../components/password/PasswordRequirements';
import { defaultPasswordRequirements } from '../../constants';

export type CreatePasswordProps = {
    onPasswordChanged: (password: string) => void;
    initialPassword?: string;
};

export const CreatePassword: React.FC<CreatePasswordProps> = (props) => {
    const { onPasswordChanged, initialPassword = '' } = props;
    const theme = useTheme();
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

    React.useEffect(() => {
        onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordInput, confirmInput, areValidMatchingPasswords]); // ignore props

    return (
        <>
            <Typography>{t('CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>
            <Divider style={{ margin: '32px 0' }} />
            <SecureTextField
                id="password"
                name="password"
                label={t('FORMS.PASSWORD')}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
            />
            <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                label={t('FORMS.CONFIRM_PASSWORD')}
                style={{ marginTop: theme.spacing(2) }}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => setConfirmInput(evt.target.value)}
                error={confirmInput !== '' && passwordInput !== confirmInput}
            />
        </>
    );
};
