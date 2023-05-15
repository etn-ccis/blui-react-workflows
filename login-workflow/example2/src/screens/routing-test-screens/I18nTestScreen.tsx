import React from 'react';

import { Button, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContextProvider';

export const I18nTestScreen: React.FC<React.PropsWithChildren> = () => {
    const auth = useAuth();

    return (
        <>
            <Typography sx={{ mb: 4 }}>Current Language: {auth.language}</Typography>
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
