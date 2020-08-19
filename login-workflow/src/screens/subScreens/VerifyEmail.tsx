import React, { useEffect } from 'react';
import { TextField, Typography, Divider, useTheme, Button } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';

export type VerifyEmailProps = {
    initialCode?: string;
    onVerifyCodeChanged: (code: string) => void;
    onResendVerificationEmail: () => void;
};
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
            <Divider style={{ margin: '32px 0' }} />
            <TextField
                label={t('SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
                fullWidth
                id="verificationCode"
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
