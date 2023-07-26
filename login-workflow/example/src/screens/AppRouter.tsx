import React from 'react';
import {
    AccountDetailsScreen,
    AuthContextProvider,
    CreateAccountScreen,
    CreatePasswordScreen,
    ContactSupportScreen,
    EulaScreen,
    ReactAuthGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
    ResetPasswordScreen,
    useSecurityActions,
    RegistrationWorkflow,
    VerifyCodeScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from '../navigation/Routing';
import { ExampleHome } from './ExampleHome';
import { PageNotFound } from './PageNotFound';

export const AppRouter: React.FC = () => {
    const { language, isAuthenticated } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(securityContextActions)}
                        language={language}
                        navigate={navigate}
                        routeConfig={routes}
                    >
                        <Outlet />
                    </AuthContextProvider>
                }
            >
                <Route path={'/login'} element={<Login />} />
                <Route path={'/forgot-password'} element={<ForgotPasswordScreen />} />
                <Route path={'/contact-support'} element={<ContactSupportScreen />} />
                <Route path={'/reset-password'} element={<ResetPasswordScreen />} />
                <Route path={'*'} element={<PageNotFound />} />
            </Route>
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreateAccountScreen />
                            <VerifyCodeScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen />
                        </RegistrationWorkflow>
                    }
                />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen />
                            <RegistrationSuccessScreen />
                        </RegistrationWorkflow>
                    }
                />
            </Route>

            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ReactAuthGuard isAuthenticated={isAuthenticated} fallBackUrl={'/login'}>
                        <ExampleHome />
                    </ReactAuthGuard>
                }
            />
            <Route element={<ReactAuthGuard isAuthenticated={isAuthenticated} fallBackUrl={'/login'} />}>
                <Route path="/homepage" element={<ExampleHome />} />
            </Route>
        </Routes>
    );
};
