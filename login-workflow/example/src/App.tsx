import React from 'react';
import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
    // RegistrationData,
} from '@brightlayer-ui/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';
import { ExampleHome } from './screens/ExampleHome';
// import { CustomDetailsScreen, CustomDetailsScreenTwo } from './components/CustomDetailsScreen';
import { routes } from './navigation/Routing';
import productLogo from './assets/images/eaton_stacked_logo.png';
// import {
//     CustomAccountAlreadyExistsScreen,
//     CustomRegistrationSuccessScreen,
// } from './screens/ExampleRegistrationSuccess';

// Imports for internationalization
import i18n from 'i18next';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Navigate, Route } from 'react-router-dom';
import { ExamplePreAuth } from './screens/ExamplePreAuth';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router';

// Uncomment these lines to add your app-specific translation resource
i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });

// Uncomment these lines to override workflow strings / translations
i18n.addResourceBundle('en', 'blui', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
// i18n.addResourceBundle('es', 'blui', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
// i18n.addResourceBundle('fr', 'blui', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);

export const AuthUIConfiguration: React.FC<React.PropsWithChildren> = (props) => {
    const securityContextActions = useSecurityActions();
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        color={'inherit'}
                        onClick={(): void => {
                            void i18n.changeLanguage('en');
                        }}
                    >
                        {`${t('BUTTONLABEL')}-EN`}
                    </Button>
                    <Button
                        color={'inherit'}
                        onClick={(): void => {
                            void i18n.changeLanguage('es');
                        }}
                    >
                        {`${t('BUTTONLABEL')}-ES`}
                    </Button>
                    <Button
                        color={'inherit'}
                        onClick={(): void => {
                            void i18n.changeLanguage('fr');
                        }}
                    >
                        {`${t('BUTTONLABEL')}-FR`}
                    </Button>
                    <Button
                        color={'inherit'}
                        onClick={(): void => {
                            void i18n.changeLanguage('zh');
                        }}
                    >
                        {`${t('BUTTONLABEL')}-ZH`}
                    </Button>
                    <Button
                        color={'inherit'}
                        onClick={(): void => {
                            void i18n.changeLanguage('pt');
                        }}
                    >
                        {`${t('BUTTONLABEL')}-PT`}
                    </Button>
                </Box>
            }
            // loginType={'username'}
            // Uncomment this line to see how to add custom form fields to the registration screens
            // customAccountDetails={[
            //     { component: CustomDetailsScreen },
            //     {
            //         component: CustomDetailsScreenTwo,
            //         title: 'Job Info',
            //         instructions: 'Enter your employment information below.',
            //     },
            // ]}
            // registrationSuccessScreen={(registrationData: RegistrationData): JSX.Element => (
            //     <CustomRegistrationSuccessScreen registrationData={registrationData} />
            // )}
            // accountAlreadyExistsScreen={(): JSX.Element => <CustomAccountAlreadyExistsScreen />}
            // registrationConfig={{
            //     firstName: {
            //         maxLength: 30,
            //     },
            //     lastName: {
            //         maxLength: 30,
            //     },
            // }}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const MySharedWrapper: React.FC<React.PropsWithChildren> = () => (
    <>
        <AppBar>
            <Toolbar>
                <Typography>PAGE TITLE</Typography>
            </Toolbar>
        </AppBar>
        <Outlet />
    </>
);
export const MyAppRoutes = (
    <>
        <Route path={''} element={<ExampleHome />} />
        {/* <Route path={'subpage'} element={<ExamplePreAuth />} />
        <Route path={'subpage/nested'} element={<h1>Nested</h1>} /> */}
        <Route path={'*'} element={<Navigate to={''} />} />
    </>
);

export const App: React.FC<React.PropsWithChildren> = () => (
    <SecurityContextProvider>
        <AuthUIConfiguration>
            <AuthNavigationContainer
                routeConfig={routes}
                extraRoutes={[<Route path={'/pre-auth'} element={<ExamplePreAuth />} key={'pre-auth'} />]}
            >
                <Route path={''} /*element={<MySharedWrapper />}*/>{MyAppRoutes}</Route>
            </AuthNavigationContainer>
        </AuthUIConfiguration>
    </SecurityContextProvider>
);
