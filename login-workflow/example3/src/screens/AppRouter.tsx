import React, { useCallback, useEffect, useState } from 'react';
import {
    AccountDetailsScreen,
    AuthContextProvider,
    CreateAccountScreen,
    CreatePasswordScreen,
    ContactSupportScreen,
    EulaScreen,
    ExperimentalAuthGuard,
    ForgotPasswordScreen,
    RegistrationContextProvider,
    ResetPasswordScreen,
    useSecurityActions,
    RegistrationWorkflow,
    VerifyCodeScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from '../navigation/Routing';
import { ExampleHome } from './ExampleHome';
import { CustomScreen } from './CustomScreen';
import { useAppContext } from '../contexts';
import {i18nAppInstance} from '../contexts/i18nAppInstance';
import { LocalStorage } from '../store/local-storage';

export const AppRouter: React.FC = () => {
    const { user, language, isAuthenticated } = useAppContext();
    // const authData = LocalStorage.readAuthData();
    // eslint-disable-next-line
    const [appIsAuthenticated, setAppIsAuthenticated] = useState(user ? true : false);
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();

    // const checkInitialData = useCallback(
    //     async (): Promise<void> => {
    //         try { 
    //             const data = await LocalStorage.readAuthData();
    //             setAppIsAuthenticated(data ? true: false);
                
    //         } catch (e) {
    //             console.error('not able to retrieve local storage data ... ')
    //         }
    //     },
    //     [isAuthenticated]
    // );

    // useEffect(() => {
    //    void checkInitialData();


    // }, [language, isAuthenticated, appIsAuthenticated]);



//     console.log('app lan', language);
//     console.log('app auth', isAuthenticated)
// console.log('provider auth ', appIsAuthenticated);
console.log(user, 'app user');
    
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
                        i18n={i18nAppInstance}
                    >
                        <Outlet />
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
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <CustomScreen />
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
                    // <ExperimentalAuthGuard
                    //     isAuthenticated={user ? true : false}
                    //     fallbackComponent={<Navigate to={`/login`} />}
                    // >
                        <ExampleHome />
                    // </ExperimentalAuthGuard>
                }
            />
            <Route
                path={'*'}
                element={
                    <ExperimentalAuthGuard
                        isAuthenticated={appIsAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <Navigate to={'/login'} />
                    </ExperimentalAuthGuard>
                }
            />
        </Routes>
    );
};
