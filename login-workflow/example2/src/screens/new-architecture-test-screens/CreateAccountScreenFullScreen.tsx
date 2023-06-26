import React from 'react';
import { useNavigate } from 'react-router';
import { CreateAccountScreen, RegistrationContextProvider, i18nRegistrationInstance } from '@brightlayer-ui/react-auth-workflow';
import Box from '@mui/material/Box';
import { useApp } from '../../contexts/AppContextProvider';
import { routes } from '../../navigation/Routing';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';

// const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// const emailValidator = (email: string): boolean | string =>
//     new RegExp(EMAIL_REGEX).test(email) ? true : 'Please enter a valid email';

export const CreateAccountScreenFullScreen = (): JSX.Element => {
    const navigate = useNavigate();
    const { language } = useApp();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <RegistrationContextProvider
                i18n={i18nRegistrationInstance}
                language={language}
                routeConfig={routes}
                navigate={navigate}
                actions={ProjectRegistrationUIActions}
            >
                <CreateAccountScreen
                // emailValidator={emailValidator}
                // initialValue={''}
                // emailLabel={'Email Address'}
                />
            </RegistrationContextProvider >
        </Box>
    );
};
