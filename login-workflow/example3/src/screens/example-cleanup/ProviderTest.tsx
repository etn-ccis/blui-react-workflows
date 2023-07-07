/** eslint-disable */
import React from 'react';
import {
    AuthContextProvider,
    ExperimentalGuestGuard,
    i18nRegistrationInstance,
    RegistrationContextProvider,
    LoginScreen,
    useSecurityActions,
    ContactSupportScreen,
    RegistrationWorkflow,
    EulaScreen,
    VerifyCodeScreen,
    ForgotPasswordScreen,
    CreatePasswordScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../../actions/AuthUIActions';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';

export const ProviderTest: React.FC<React.PropsWithChildren> = () => {
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    return (
        <AuthContextProvider
            actions={ProjectAuthUIActions(securityContextActions)}
            language={language}
            navigate={navigate}
            routeConfig={{}}
        >
            <RegistrationContextProvider
                i18n={i18nRegistrationInstance}
                language={language}
                routeConfig={{}}
                navigate={navigate}
                actions={ProjectRegistrationUIActions}
            >
                <Routes>
                    <Route
                        path={'login'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <LoginScreen />
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'forgot-password'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ForgotPasswordScreen />
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'self-registration'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
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
                        path={'/contact-support'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ContactSupportScreen />
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'*'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <Login />
                            </ExperimentalGuestGuard>
                        }
                    />
                </Routes>
            </RegistrationContextProvider>
        </AuthContextProvider>
    );
};
