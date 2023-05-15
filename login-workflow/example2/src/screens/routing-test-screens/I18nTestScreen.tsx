import React from 'react';

import { Button, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContextProvider';
import { useTranslation } from 'react-i18next';

export const I18nTestScreen: React.FC<React.PropsWithChildren> = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <>
            <Typography sx={{ mb: 4 }}>Current Language: {auth.language}</Typography>
            <Typography>{t('bluiRegistration:REGISTRATION.EULA.LOADING')}</Typography>
            <Typography sx={{ mb: 2 }}>{t('bluiRegistration:REGISTRATION.STEPS.COMPLETE')}</Typography>
            <Button
                onClick={(): void => {
                    auth.setLanguage('en');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use en`}
            </Button>
            <Button
                onClick={(): void => {
                    auth.setLanguage('fr');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use fr`}
            </Button>
            <Button
                onClick={(): void => {
                    auth.setLanguage('es');
                }}
                variant={'contained'}
                sx={{ mr: 1 }}
            >
                {`Use es`}
            </Button>
            <Button
                onClick={(): void => {
                    auth.setLanguage('kn');
                }}
                variant={'contained'}
            >
                {`Use kn`}
            </Button>
        </>
    );
};
