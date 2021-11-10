import React, { useState } from 'react';
import { EMAIL_REGEX, useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { TextField, Typography, Divider } from '@material-ui/core';
import { useDialogStyles } from '../../styles';

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
export const CreateAccount: React.FC<CreateAccountProps> = (props) => {
    const { initialEmail, onEmailChanged, onSubmit } = props;
    const classes = useDialogStyles();
    const { t } = useLanguageLocale();

    const [emailInput, setEmailInput] = useState(initialEmail ?? '');

    const showEmailError = emailInput.length !== 0 && !isValidEmail(emailInput);

    return (
        <>
            <Typography>{t('pxb:SELF_REGISTRATION.INSTRUCTIONS')}</Typography>
            <Divider className={classes.fullDivider} />
            <TextField
                id="email"
                label={t('pxb:LABELS.EMAIL')}
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
                helperText={showEmailError ? t('pxb:MESSAGES.EMAIL_ENTRY_ERROR') : ''}
            />
        </>
    );
};
