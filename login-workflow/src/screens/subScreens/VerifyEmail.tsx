import React, { useEffect } from 'react';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { TextField, Typography, Divider, useTheme, Button } from '@material-ui/core';
import { useDialogStyles } from '../../styles';

export type VerifyEmailProps = {
    initialCode?: string;
    onVerifyCodeChanged: (code: string) => void;
    onResendVerificationEmail: () => void;
    onSubmit?: () => void;
};

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param initialCode code used to pre-populate the field
 * @param onVerifyCodeChanged function to call when the code input value changes
 * @param onResendVerificationEmail function to call when the user clicks the 'resend code' button
 * @param onSubmit function to call when the user submits the mini form
 *
 * @category Component
 */
export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
    const { initialCode, onVerifyCodeChanged, onResendVerificationEmail, onSubmit } = props;
    const theme = useTheme();
    const classes = useDialogStyles();
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
            <Divider className={classes.fullDivider} />
            <TextField
                id="code"
                label={t('SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
                fullWidth
                value={verifyCode}
                onChange={(evt): void => {
                    setVerifyCode(evt.target.value);
                }}
                onKeyPress={(e): void => {
                    if (e.key === 'Enter' && onSubmit) onSubmit();
                }}
                variant="filled"
            />
            <Button
                variant={'contained'}
                color={'primary'}
                disableElevation
                onClick={(): void => onResendVerificationEmail()}
                style={{ marginTop: theme.spacing(2) }}
            >
                {t('SELF_REGISTRATION.VERIFY_EMAIL.RESEND')}
            </Button>
        </>
    );
};
