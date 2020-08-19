import React, { useState } from 'react';
import { TextField, Typography, Divider } from '@material-ui/core';
import { EMAIL_REGEX, useLanguageLocale } from '@pxblue/react-auth-shared';

const isValidEmail = (text: string): boolean => new RegExp(EMAIL_REGEX).test(text);

export type CreateAccountProps = {
    initialEmail?: string;
    onEmailChanged: (email: string) => void;
};
export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const { initialEmail, onEmailChanged } = props;
    const { t } = useLanguageLocale();

    const [emailInput, setEmailInput] = useState(initialEmail ?? '');

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <>
            <Typography>{t('SELF_REGISTRATION.INSTRUCTIONS')}</Typography>
            <Divider style={{ margin: '32px 0' }} />
            <TextField
                label={t('LABELS.EMAIL')}
                fullWidth
                id="email"
                value={emailInput}
                onChange={(evt): void => {
                    setEmailInput(evt.target.value);
                    const validEmailOrEmpty = isValidEmail(evt.target.value) ? evt.target.value : '';
                    onEmailChanged(validEmailOrEmpty);
                }}
                variant="filled"
                error={showEmailError}
                helperText={showEmailError ? t('MESSAGES.EMAIL_ENTRY_ERROR') : ''}
            />
        </>
    );
};
