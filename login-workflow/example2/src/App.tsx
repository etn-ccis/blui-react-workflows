import React from 'react';
import { i18nRegistrationInstance, RegistrationContextProvider } from '@brightlayer-ui/react-auth-workflow';

import { Button, Typography } from '@mui/material';

i18nRegistrationInstance.addResourceBundle('kn', 'bluiRegistration', { test: 'ಈಗ ನೋಂದಣಿ ಮಾಡಿ!' }, true, true);

export const App: React.FC<React.PropsWithChildren> = () => {
    const [language, setLanguage] = React.useState('en');

    return (
        <RegistrationContextProvider
            i18n={i18nRegistrationInstance}
            language={language}
            routeConfig={{}}
            navigate={(): void => {}}
        >
            <>
                <Typography sx={{ mb: 4 }}>Current Language: {language}</Typography>
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
                        setLanguage('kn');
                    }}
                    variant={'contained'}
                >
                    {`Use kn`}
                </Button>
            </>
        </RegistrationContextProvider>
    );
};
