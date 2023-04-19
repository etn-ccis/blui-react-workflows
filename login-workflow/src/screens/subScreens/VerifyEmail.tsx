import React, { useEffect } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { FullDividerStyles } from '../../styles';
import Box from '@mui/material/Box';

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
export const VerifyEmail: React.FC<React.PropsWithChildren<React.PropsWithChildren<VerifyEmailProps>>> = (props) => {
    const { initialCode, onVerifyCodeChanged, onResendVerificationEmail, onSubmit } = props;
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
            <Typography>{t('blui:SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE')}</Typography>
            <Divider sx={FullDividerStyles(theme)} />
            <TextField
                id="code"
                label={t('blui:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION')}
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
            <Box sx={{ mt: 2 }}>
                <Typography>
                    {t('blui:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION_CODE_PROMPT')}
                    <Typography
                        sx={{ fontSize: 'inherit', textTransform: 'initial', '&:hover': { cursor: 'pointer' } }}
                        onClick={(): void => onResendVerificationEmail()}
                        color="primary"
                        variant={'button'}
                    >
                        {' '}
                        <u>{t('blui:ACTIONS.RESEND')}</u>
                    </Typography>
                </Typography>
            </Box>
        </>
    );
};
