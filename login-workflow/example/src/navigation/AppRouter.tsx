import React from 'react';
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
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from '../screens/Login';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from './Routing';
import { ExampleHome } from '../screens/ExampleHome';
import { i18nAppInstance } from '../translations/i18n';
import { InviteRegistrationWorkflow } from '../screens/InviteRegistrationWorkflow';

export const AppRouter: React.FC = () => {
    const { language } = useApp();
    const navigate = useNavigate();
    const app = useApp();
    const { email, rememberMe } = app.loginData;

    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(app)}
                        language={language}
                        navigate={navigate}
                        routeConfig={routes}
                        i18n={i18nAppInstance}
                        rememberMeDetails={{ email: rememberMe ? email : '', rememberMe: rememberMe }}
                    >
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <Outlet />
                        </ReactRouterGuestGuard>
                    </AuthContextProvider>
                }
            >
                <Route path={'/login'} element={<Login />} />
                <Route path={'/forgot-password'} element={<ForgotPasswordScreen />} />
                <Route path={'/contact-support'} element={<ContactSupportScreen />} />
                <Route path={'/reset-password'} element={<ResetPasswordScreen />} />
            </Route>
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions}
                        i18n={i18nAppInstance}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route path={'/self-registration'} element={<RegistrationWorkflow />} />
                <Route path={'/register-by-invite'} element={<InviteRegistrationWorkflow />} />
            </Route>

            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <ExampleHome />
                    </ReactRouterAuthGuard>
                }
            />
            <Route path={'/'} element={<Navigate to={'/homepage'} replace />} />
            <Route
                path={'*'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <Navigate to={'/login'} />
                    </ReactRouterAuthGuard>
                }
            />
        </Routes>
    );
};
