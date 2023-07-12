import React from 'react';
import {
    AccountDetailsScreen,
    AuthContextProvider,
    CreateAccountScreen,
    CreatePasswordScreen,
    ContactSupportScreen,
    EulaScreen,
    ExperimentalAuthGuard,
    ExperimentalGuestGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
    ResetPasswordScreen,
    useSecurityActions,
    RegistrationWorkflow,
    VerifyCodeScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import { routes } from '../../navigation/Routing';
import { ExampleHome } from './ExampleHome';

export const ExampleProvider: React.FC = () => {
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
                <Route
                    path={'/login'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <Login />
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                    path={'/forgot-password'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <ForgotPasswordScreen />
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                    path={'/contact-support'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <ContactSupportScreen />
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                    path={'/reset-password'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <ResetPasswordScreen />
                        </ExperimentalGuestGuard>
                    }
                />
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
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <CreateAccountScreen />
                                <VerifyCodeScreen />
                                <CreatePasswordScreen />
                                <AccountDetailsScreen />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={isAuthenticated}
                            fallbackComponent={<Navigate to={`/login`} />}
                        >
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <CreatePasswordScreen />
                                <AccountDetailsScreen />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
            </Route>

            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ExperimentalAuthGuard isAuthenticated={true} fallbackComponent={<Navigate to={`/login`} />}>
                        <ExampleHome />
                    </ExperimentalAuthGuard>
                }
            />
            <Route
                path={'*'}
                element={
                    <ExperimentalAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <Navigate to={'/login'} />
                    </ExperimentalAuthGuard>
                }
            />
        </Routes>
    );
};
