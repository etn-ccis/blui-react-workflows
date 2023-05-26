import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { FullDividerStyles } from '../../styles';
import { useTheme } from '@mui/material/styles';
import { useLanguageLocale } from '../../auth-shared';
import { EMAIL_REGEX } from '../../new-architecture';

const isValidEmail = (text: string): boolean => new RegExp(EMAIL_REGEX).test(text);

export type CreateAccountProps = {
    initialEmail?: string;
    onEmailChanged: (email: string) => void;
    onSubmit?: () => void;
};

/**
 * Component that renders a screen for the user to enter their email address to start the
 * account creation process.
 *
 * @param initialEmail email address used to pre-fill the text field
 * @param onEmailChanged function to call when the value of the email input changes
 * @param onSubmit function to call when the user submits the mini form
 *
 * @category Component
 */
export const CreateAccount: React.FC<React.PropsWithChildren<React.PropsWithChildren<CreateAccountProps>>> = (
    props
) => {
    const { initialEmail, onEmailChanged, onSubmit } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    const [emailInput, setEmailInput] = useState(initialEmail ?? '');

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <>
            <Typography>{t('blui:SELF_REGISTRATION.INSTRUCTIONS')}</Typography>
            <Divider sx={FullDividerStyles(theme)} />
            <TextField
                id="email"
                label={t('blui:LABELS.EMAIL')}
                fullWidth
                value={emailInput}
                onChange={(evt): void => {
                    setEmailInput(evt.target.value);
                    const validEmailOrEmpty = isValidEmail(evt.target.value) ? evt.target.value : '';
                    onEmailChanged(validEmailOrEmpty);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                variant="filled"
                error={showEmailError}
                helperText={showEmailError ? t('blui:MESSAGES.EMAIL_ENTRY_ERROR') : ''}
            />
        </>
    );
};
