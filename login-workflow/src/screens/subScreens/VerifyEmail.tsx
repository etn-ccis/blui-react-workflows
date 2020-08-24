import React, { useEffect } from 'react';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { TextField, Typography, Divider, useTheme, Button } from '@material-ui/core';

export type VerifyEmailProps = {
    initialCode?: string;
    onVerifyCodeChanged: (code: string) => void;
    onResendVerificationEmail: () => void;
};

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param initialCode code used to pre-populate the field
 * @param onVerifyCodeChanged function to call when the code input value changes
 * @param onResendVerificationEmail function to call when the user clicks the 'resend code' button
 *
 * @category Component
 */
export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
    const { initialCode, onVerifyCodeChanged, onResendVerificationEmail } = props;
    const theme = useTheme();
    const { t } = useLanguageLocale();

    const [verifyCode, setVerifyCode] = React.useState(initialCode ?? '');

    useEffect(() => {
        setVerifyCode(initialCode ?? '');
    }, [initialCode]);

    useEffect(() => {
        onVerifyCodeChanged(verifyCode);
    }, [verifyCode, onVerifyCodeChanged]);

    return (
        <>
            <Typography>{t('SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE')}</Typography>
            <Divider style={{ margin: `${theme.spacing(4)}px 0px` }} />
            <TextField
                id="code"
                label={t('SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
                fullWidth
                value={verifyCode}
                onChange={(evt): void => {
                    setVerifyCode(evt.target.value);
                }}
                variant="filled"
            />
            <Button
                variant={'contained'}
                color={'primary'}
                onClick={(): void => onResendVerificationEmail()}
                style={{ marginTop: theme.spacing(2) }}
            >
                {t('SELF_REGISTRATION.VERIFY_EMAIL.RESEND')}
            </Button>
        </>
    );
};
