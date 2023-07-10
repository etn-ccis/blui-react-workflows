import { Box } from '@mui/material';
import { ForgotPasswordScreen } from '@brightlayer-ui/react-auth-workflow';
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";

export const ForgotPassword = (): JSX.Element => {
    const { t } = useTranslation();
    console.log('test', t('description.part2'))
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: '1 1 0px' }}>
                <span>{`${t('description.part2')}`}</span><br/>
                <span>{`${t('WELCOME')}`}</span>
            </Box>
           
        </Box>
    );
};
