import React from 'react';
import {
    // SecurityContextProvider,
    // AuthNavigationContainer,
    // AuthUIContextProvider,
    // useSecurityActions,
    // RegistrationData,
    i18nRegistrationInstance,
    RegistrationContextProvider,
} from '@brightlayer-ui/react-auth-workflow';
// import { ProjectAuthUIActions } from './actions/AuthUIActions';
// import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';
// import { ExampleHome } from './screens/ExampleHome';
// import { CustomDetailsScreen, CustomDetailsScreenTwo } from './components/CustomDetailsScreen';
// import { routes } from './navigation/Routing';
// import productLogo from './assets/images/eaton_stacked_logo.png';
// import {
//     CustomAccountAlreadyExistsScreen,
//     CustomRegistrationSuccessScreen,
// } from './screens/ExampleRegistrationSuccess';

// Imports for internationalization
// import i18n from 'i18next';
// import Button from '@mui/material/Button';
// import { useTranslation } from 'react-i18next';
// import { Navigate, Route } from 'react-router-dom';
// import { ExamplePreAuth } from './screens/ExamplePreAuth';
import { /*AppBar,*/ Button, /* Toolbar,*/ Typography } from '@mui/material';
// import { Outlet } from 'react-router';

// Uncomment these lines to add your app-specific translation resource
// i18n.addResourceBundle('en', 'app', { BUTTONLABEL: 'Change Language' });
// i18n.addResourceBundle('es', 'app', { BUTTONLABEL: '¡Cambia el idioma!' });
// i18n.addResourceBundle('fr', 'app', { BUTTONLABEL: 'Changez de Langue' });

// Uncomment these lines to override workflow strings / translations
// i18n.addResourceBundle('en', 'blui', { ACTIONS: { CREATE_ACCOUNT: 'Register now!' } }, true, true);
// i18n.addResourceBundle('es', 'blui', { ACTIONS: { CREATE_ACCOUNT: '¡Regístrate ahora!' } }, true, true);
// i18n.addResourceBundle('fr', 'blui', { ACTIONS: { CREATE_ACCOUNT: `S'inscrire maintenant!` } }, true, true);

// i18nRegistrationInstance.addResourceBundle('kn', 'bluiRegistration', { test: 'ಈಗ ನೋಂದಣಿ ಮಾಡಿ!' }, true, true);

// const NewDemo = () => {
//     const { t } = useTranslation();
//     useEffect(() => {
//         i18nRegistrationInstance.changeLanguage('kn');
//     }, [i18nRegistrationInstance]);

//     return <Typography>{t('registration:test')}</Typography>;
// };

// const RegistrationContextProvider = (props: any) => {
//     const { i18nInstance = i18nRegistrationInstance } = props;

//     return (
//         <I18nextProvider i18n={i18nInstance}>
//             <NewDemo />
//         </I18nextProvider>
//     );
// };

const MockRouteConfig = {};

// export const AuthUIConfiguration: React.FC<React.PropsWithChildren> = () => {
//     // const securityContextActions = useSecurityActions();
//     // const { t } = useTranslation();
//     const [language, setLanguage] = React.useState('en');

//     return (
//         <RegistrationContextProvider
//             i18n={i18nRegistrationInstance}
//             language={'en'}
//             routeConfig={MockRouteConfig}
//             navigate={(): void => {}}
//         >
//             <>
//                 <Typography sx={{ mb: 4 }}>Current Language: {language}</Typography>

//                 {/* <Typography>{t('bluiRegistration:REGISTRATION.EULA.LOADING')}</Typography>
//                 <Typography>{t('bluiRegistration:REGISTRATION.STEPS.COMPLETE')}</Typography>
//                 <Typography>{t('bluiRegistration:test')}</Typography> */}
//                 <Button
//                     onClick={(): void => {
//                         setLanguage('en');
//                     }}
//                     variant={'contained'}
//                     sx={{ mr: 1 }}
//                 >
//                     {`Use en`}
//                 </Button>
//                 <Button
//                     onClick={(): void => {
//                         setLanguage('fr');
//                     }}
//                     variant={'contained'}
//                     sx={{ mr: 1 }}
//                 >
//                     {`Use fr`}
//                 </Button>
//                 <Button
//                     onClick={(): void => {
//                         setLanguage('es');
//                     }}
//                     variant={'contained'}
//                     sx={{ mr: 1 }}
//                 >
//                     {`Use es`}
//                 </Button>
//                 <Button
//                     onClick={(): void => {
//                         setLanguage('kn');
//                     }}
//                     variant={'contained'}
//                 >
//                     {`Use kn`}
//                 </Button>
//             </>
//         </RegistrationContextProvider>
// <AuthUIContextProvider
//     authActions={ProjectAuthUIActions(securityContextActions)}
//     registrationActions={ProjectRegistrationUIActions}
//     allowDebugMode={true}
//     htmlEula={false}
//     contactEmail={'something@email.com'}
//     contactPhone={'1-800-123-4567'}
//     projectImage={productLogo}
//     loginFooter={
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button
//                 color={'inherit'}
//                 onClick={(): void => {
//                     void i18n.changeLanguage('en');
//                 }}
//             >
//                 {`${t('BUTTONLABEL')}-EN`}
//             </Button>
//             <Button
//                 color={'inherit'}
//                 onClick={(): void => {
//                     void i18n.changeLanguage('es');
//                 }}
//             >
//                 {`${t('BUTTONLABEL')}-ES`}
//             </Button>
//             <Button
//                 color={'inherit'}
//                 onClick={(): void => {
//                     void i18n.changeLanguage('fr');
//                 }}
//             >
//                 {`${t('BUTTONLABEL')}-FR`}
//             </Button>
//             <Button
//                 color={'inherit'}
//                 onClick={(): void => {
//                     void i18n.changeLanguage('zh');
//                 }}
//             >
//                 {`${t('BUTTONLABEL')}-ZH`}
//             </Button>
//             <Button
//                 color={'inherit'}
//                 onClick={(): void => {
//                     void i18n.changeLanguage('pt');
//                 }}
//             >
//                 {`${t('BUTTONLABEL')}-PT`}
//             </Button>
//         </Box>
//     }
//     // loginType={'username'}
//     // Uncomment this line to see how to add custom form fields to the registration screens
//     // customAccountDetails={[
//     //     { component: CustomDetailsScreen },
//     //     {
//     //         component: CustomDetailsScreenTwo,
//     //         title: 'Job Info',
//     //         instructions: 'Enter your employment information below.',
//     //     },
//     // ]}
//     // registrationSuccessScreen={(registrationData: RegistrationData): JSX.Element => (
//     //     <CustomRegistrationSuccessScreen registrationData={registrationData} />
//     // )}
//     // accountAlreadyExistsScreen={(): JSX.Element => <CustomAccountAlreadyExistsScreen />}
//     // registrationConfig={{
//     //     firstName: {
//     //         maxLength: 30,
//     //     },
//     //     lastName: {
//     //         maxLength: 30,
//     //     },
//     // }}
// >
//     {props.children}
// </AuthUIContextProvider>
//     );
// };

// export const MySharedWrapper: React.FC<React.PropsWithChildren> = () => (
//     <>
//         <AppBar>
//             <Toolbar>
//                 <Typography>PAGE TITLE</Typography>
//             </Toolbar>
//         </AppBar>
//         <Outlet />
//     </>
// );
// export const MyAppRoutes = (
//     <>
//         <Route path={''} element={<ExampleHome />} />
//         {/* <Route path={'subpage'} element={<ExamplePreAuth />} />
//         <Route path={'subpage/nested'} element={<h1>Nested</h1>} /> */}
//         <Route path={'*'} element={<Navigate to={''} />} />
//     </>
// );

// export const App: React.FC<React.PropsWithChildren> = () => (
//     <SecurityContextProvider>
//         <AuthUIConfiguration>
//             <AuthNavigationContainer
//                 routeConfig={routes}
//                 extraRoutes={[<Route path={'/pre-auth'} element={<ExamplePreAuth />} key={'pre-auth'} />]}
//             >
//                 <Route path={''} /*element={<MySharedWrapper />}*/>{MyAppRoutes}</Route>
//             </AuthNavigationContainer>
//         </AuthUIConfiguration>
//     </SecurityContextProvider>
// );

export const App: React.FC<React.PropsWithChildren> = () => {
    const [language, setLanguage] = React.useState('en');

    return (
        <RegistrationContextProvider
            i18n={i18nRegistrationInstance}
            language={language}
            routeConfig={MockRouteConfig}
            navigate={(): void => {}}
        >
            <>
                <Typography sx={{ mb: 4 }}>Current Language: {language}</Typography>

                {/* <Typography>{t('bluiRegistration:REGISTRATION.EULA.LOADING')}</Typography>
                <Typography>{t('bluiRegistration:REGISTRATION.STEPS.COMPLETE')}</Typography>
                <Typography>{t('bluiRegistration:test')}</Typography> */}
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
