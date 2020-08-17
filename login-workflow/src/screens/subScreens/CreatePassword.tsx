import React, { useState, useCallback, ChangeEvent } from 'react';
import { Typography, Divider, useTheme } from '@material-ui/core';
import {
    useLanguageLocale,
    PasswordRequirement,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    SPECIAL_CHAR_REGEX,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { SecureTextField } from '../../components/SecureTextField';
import { PasswordRequirements } from '../../components/password/PasswordRequirements';

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

    const defaultRequirements: PasswordRequirement[] = [
        {
            regex: LENGTH_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('PASSWORD_REQUIREMENTS.SPECIAL'),
        },
    ];
    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

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
                // className={classes.formFields}
                value={passwordInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                // error={hasTransitError}
                // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
            />
            <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
            <SecureTextField
                id="confirm"
                name="confirm"
                label={t('FORMS.CONFIRM_PASSWORD')}
                // className={classes.formFields}
                style={{ marginTop: theme.spacing(2) }}
                value={confirmInput}
                onChange={(evt: ChangeEvent<HTMLInputElement>): void => setConfirmInput(evt.target.value)}
                error={confirmInput !== '' && passwordInput !== confirmInput}
                // helperText={hasTransitError ? t('LOGIN.INCORRECT_CREDENTIALS') : null}
            />
        </>
    );
};
