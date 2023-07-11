/** eslint-ignore */
import React from 'react';
import {
    AuthContextProvider,
    ExperimentalGuestGuard,
    ExperimentalAuthGuard,
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
import { ForgotPassword } from './ForgotPassword';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import { useTranslation } from 'react-i18next';
import { CreatePassword } from './CreatePassword';
import { GuardedScreen } from '../new-architecture-test-screens';
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
        <>
            {/* <RegistrationContextProvider
                language={language}
                routeConfig={routes}
                navigate={navigate}
                actions={ProjectRegistrationUIActions}
            >
                <Routes>
                <Route
                    path={'self-registration'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={false}
                            fallbackComponent={<Navigate to={`/guarded`} />}>
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <VerifyCodeScreen />
                                <CreatePassword />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
                <Route
                        path={'*'}
                        element={
                            <AuthContextProvider
                actions={ProjectAuthUIActions(securityContextActions)}
                language={language}
                navigate={navigate}
                routeConfig={routes}
            >
                <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <Login />
                            </ExperimentalGuestGuard>
            </AuthContextProvider>
                        }
                    />
                </Routes>
                
            </RegistrationContextProvider>
            <AuthContextProvider
                actions={ProjectAuthUIActions(securityContextActions)}
                language={language}
                navigate={navigate}
                routeConfig={routes}
            >
                <Routes>
                    <Route
                        path={'login'}
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
                        path={'forgot-password'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={isAuthenticated}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ForgotPasswordScreen/>
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'contact-support'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={isAuthenticated}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ContactSupportScreen/>
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'/'}
                        element={
                            <ExperimentalAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <Login />
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
                        <Login />
                    </ExperimentalAuthGuard>
                        }
                    />
                </Routes>    
            </AuthContextProvider> */}


            <Routes>
                <AuthContextProvider
                    actions={ProjectAuthUIActions(securityContextActions)}
                    language={language}
                    navigate={navigate}
                    routeConfig={routes}
                >
                    <Route
                        path={'login'}
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
                        path={'forgot-password'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={isAuthenticated}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ForgotPasswordScreen/>
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'contact-support'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={isAuthenticated}
                                fallbackComponent={<Navigate to={`/guarded`} />}
                            >
                                <ContactSupportScreen/>
                            </ExperimentalGuestGuard>
                        }
                    />
                    <Route
                        path={'/'}
                        element={
                            <ExperimentalAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <Login />
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
                        <Login />
                    </ExperimentalAuthGuard>
                        }
                    />
                </AuthContextProvider>
                <RegistrationContextProvider
                language={language}
                routeConfig={routes}
                navigate={navigate}
                actions={ProjectRegistrationUIActions}
            >
                <Route
                    path={'self-registration'}
                    element={
                        <ExperimentalGuestGuard
                            isAuthenticated={false}
                            fallbackComponent={<Navigate to={`/guarded`} />}>
                            <RegistrationWorkflow initialScreenIndex={0}>
                                <EulaScreen />
                                <VerifyCodeScreen />
                                <CreatePassword />
                                <RegistrationSuccessScreen />
                            </RegistrationWorkflow>
                        </ExperimentalGuestGuard>
                    }
                />
            </RegistrationContextProvider>
            </Routes>
        </>
    )
};
