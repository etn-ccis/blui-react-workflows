import React, { useState } from 'react';
import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';
import { ExampleHome } from './screens/ExampleHome';
// import { CustomDetailsScreen, CustomDetailsScreenTwo } from './components/CustomDetailsScreen';
import { routes } from './navigation/Routing';

import productLogo from './assets/images/eaton_stacked_logo.png';

// Imports for internationalization
import i18n from 'i18next';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// Uncomment these lines to add your app-specific translation resource
i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });

// Uncomment these lines to override workflow strings / translations
i18n.addResourceBundle('en', 'pxb', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
i18n.addResourceBundle('es', 'pxb', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
i18n.addResourceBundle('fr', 'pxb', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();
    // Language Toggle Button
    const langs = ['en', 'fr', 'es'];
    const [lang, setLang] = useState(0);
    const { t } = useTranslation();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={productLogo}
            loginFooter={
                <Button
                    onClick={(): void => {
                        setLang((lang + 1) % langs.length);
                        void i18n.changeLanguage(langs[(lang + 1) % langs.length]);
                    }}
                >
                    {t('BUTTONLABEL')}
                </Button>
            }
            // Uncomment this line to see how to add custom form fields to the registration screens
            // customAccountDetails={[
            //     { component: CustomDetailsScreen },
            //     {
            //         component: CustomDetailsScreenTwo,
            //         title: 'Job Info',
            //         instructions: 'Enter your employment information below.',
            //     },
            // ]}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => (
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer routeConfig={routes}>
                <ExampleHome />
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
);
