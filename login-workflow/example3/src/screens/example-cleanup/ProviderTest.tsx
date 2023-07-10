/** eslint-ignore */
import React from 'react';
import {
    AuthContextProvider,
    ExperimentalGuestGuard,
    i18nAuthInstance,
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
import { ForgotPassword } from './ForgotPassword';
import i18nBluiAuthInstance from '../../contexts/i18nBluiAuthInstance';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import i18nBluiRegistrationInstance from '../../contexts/i18nBluiRegistrationInstance';
import { useTranslation } from 'react-i18next';
import { CreatePassword } from './CreatePassword';



export const ProviderTest: React.FC<React.PropsWithChildren> = () => {
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();
    const { t } = useTranslation();
    console.log('i18nBluiRegistrationInstance', t('bluiRegistration:WELCOME'))
    return (
        <>
            <AuthContextProvider
                actions={ProjectAuthUIActions(securityContextActions)}
                language={language}
                navigate={navigate}
                routeConfig={{}}
                i18n={i18nBluiAuthInstance}
            >
                <Routes>
                    <Route
                        path={'forgot-password'}
                        element={
                            <ExperimentalGuestGuard
                                isAuthenticated={false}
                                fallbackComponent={<Navigate to={`/guarded`} />}>
                                <ForgotPassword />
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
                
            </AuthContextProvider>
            <RegistrationContextProvider
                i18n={i18nBluiRegistrationInstance}
                language={language}
                routeConfig={{}}
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
            <Routes>
                
            </Routes>
        </>
    )
};
