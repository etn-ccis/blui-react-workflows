import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useLanguageLocale, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { Typography, Divider, useTheme } from '@material-ui/core';
import { SecureTextField, PasswordRequirements } from '../../components';
import { defaultPasswordRequirements } from '../../constants';
import { useDialogStyles } from '../../styles';

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
    const theme = useTheme();
    const classes = useDialogStyles();
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

    useEffect(() => {
        onPasswordChanged(areValidMatchingPasswords() ? passwordInput : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onPasswordChanged, passwordInput, confirmInput, areValidMatchingPasswords]);

    return (
        <>
            <Typography>{t('CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>
            <Divider className={classes.fullDivider} />
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
                className={classes.textField}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => setConfirmInput(evt.target.value)}
                error={confirmInput !== '' && passwordInput !== confirmInput}
            />
        </>
    );
};
