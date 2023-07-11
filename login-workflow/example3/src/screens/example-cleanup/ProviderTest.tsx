import React from 'react';
import {
    AuthContextProvider,
    CreatePasswordScreen,
    ContactSupportScreen,
    EulaScreen,
    ExperimentalAuthGuard,
    ExperimentalGuestGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
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

type CustomRouterProps = {
    isAuthenticated: boolean;
};
export const ProviderTest: React.FC<CustomRouterProps> = (props) => {
    const { isAuthenticated } = props;
    const { language } = useApp();
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
                            fallbackComponent={<Navigate to={`/guarded`} />}
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
                            fallbackComponent={<Navigate to={`/guarded`} />}
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
                            fallbackComponent={<Navigate to={`/guarded`} />}
                        >
                            <ContactSupportScreen />
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
                            isAuthenticated={false}
                            fallbackComponent={<Navigate to={`/`} />}>
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <VerifyCodeScreen />
                                <CreatePasswordScreen />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={false}
                            fallbackComponent={<Navigate to={`/`} />}>
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <CreatePasswordScreen />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
            </Route>

            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/'}
                element={
                    <ExperimentalAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <span>HOME PAGE: GUARDED</span>
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
                        <Navigate to={'/'} />
                    </ExperimentalAuthGuard>
                }
            />
        </Routes>
    )
};