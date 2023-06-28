import React from 'react';

import { Button, Typography } from '@mui/material';
import { useApp } from '../../contexts/AppContextProvider';
import { useTranslation } from 'react-i18next';

export const I18nAuthTestScreen: React.FC<React.PropsWithChildren> = () => {
    const { language, setLanguage } = useApp();
    const { t } = useTranslation();

    return (
        <>
            <Typography sx={{ mb: 4 }}>Current Language: {language}</Typography>
            <Typography>{t('bluiCommon:MESSAGES.WELCOME')}</Typography>
            <Typography sx={{ mb: 2 }}>{t('bluiCommon:MESSAGES.CONGRATS')}</Typography>
            <Button
                onClick={(): void => {
                    setLanguage('en');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use en`}
            </Button>
            <Button
                onClick={(): void => {
                    setLanguage('fr');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use fr`}
            </Button>
            <Button
                onClick={(): void => {
                    setLanguage('es');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use es`}
            </Button>
            <Button
                onClick={(): void => {
                    setLanguage('zh');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use zh`}
            </Button>
            <Button
                onClick={(): void => {
                    setLanguage('pt');
                }}
                variant={'contained'}
            >
                {`Use pt`}
            </Button>
        </>
    );
};
