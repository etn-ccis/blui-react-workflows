import React, { useCallback } from 'react';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ReactRouterAuthGuard,
    ReactRouterGuestGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
    ResetPasswordScreen,
    RegistrationWorkflow,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Navigate, Outlet, Route, Routes, To } from 'react-router-dom';
import { Login } from '../screens/Login';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from './Routing';
import { ExampleHome } from '../screens/ExampleHome';
import i18nAppInstance from '../translations/i18n';
import { ChangePassword } from '../components/ChangePassword';

export const AppRouter: React.FC = (props) => {

    const {isOktaUser} = props;

    const navigation = useNavigate();
    const app = useApp();
    const { email, rememberMe } = app.loginData;
    const navigate = useCallback((destination: -1 | string) => {
        navigation(destination as To);
    }, []);

    const CommonRoutes = [
        <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(app)}
                        language={app.language}
                        navigate={navigate}
                        routeConfig={routes}
                        i18n={i18nAppInstance}
                        rememberMeDetails={{ email: rememberMe ? email : '', rememberMe: rememberMe }}
                    >
                        <Outlet />
                    </AuthContextProvider>
                }
            >
                <Route
                    path={'/login'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <Login />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/forgot-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ForgotPasswordScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/contact-support'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ContactSupportScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/reset-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ResetPasswordScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                {/* USER APPLICATION ROUTES */}
                <Route
                    element={
                        <>
                            <Outlet />
                            {app.showChangePasswordDialog && <ChangePassword />}
                        </>
                    }
                >
                    <Route
                        path={'/homepage'}
                        element={
                            <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                                <ExampleHome />
                            </ReactRouterAuthGuard>
                        }
                    />
                    <Route path={'/'} element={<Navigate to={'/homepage'} replace />} />
                </Route>
                <Route
                    path={'*'}
                    element={
                        <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                            <Navigate to={'/login'} />
                        </ReactRouterAuthGuard>
                    }
                />
            </Route>
    ]

    return (isOktaUser ? (       
        <Routes>

            {/* add common route */}
            CommonRoutes.map((route, index) => {
                return <Route/>;
            })

            <Route
            Component={oktaLoginScreen}
            />

            {/* Okta routes */}
        
        </Routes>
    ) : (
        {/* Security component routes for Okta screens 

            Create OktaAuth instance with oktaConfig and pass it to Security component as oktaAuth prop. Find more on below link
            https://github.com/okta/okta-react?tab=readme-ov-file#general-components
            const oktaAuth = new OktaAuth(oktaConfig as OktaAuthOptions);

            <Security
                oktaAuth={oktaAuth}
                restoreOriginalUri={restoreOriginalUri}
            >
                 CommonRoutes.map((route, index) => {
                return <Route/>;
            })
            <Route
                path=":realmName/login"
                element={<CustomLoginComponent/>} 
            />
            </Security>
           */}
    )

         
    );
};
