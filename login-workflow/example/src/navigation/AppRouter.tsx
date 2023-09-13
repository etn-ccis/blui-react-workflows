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
import i18nAppInstance from '../translations/i18n';
import { ChangePassword } from '../components/ChangePassword';
import { AlarmAdd, Home } from '@mui/icons-material';
import Fan from '@brightlayer-ui/icons-mui/Fan';
import EatonLogo from '../assets/images/eaton_stacked_logo.png';

export const AppRouter: React.FC = () => {
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
                            {/* <ContactSupportScreen
                                icon={<AlarmAdd />}
                                emailSupportTitle={'This is email support title prop'}
                                emailSupportContent={
                                    (email: string) => {
                                        return `Send here ${email}`
                                    }
                                }
                                phoneSupportTitle={'99674321**'}
                                phoneSupportContent={
                                    (phone: string) => {
                                        return `Call here ${phone}`
                                    }
                                }
                                contactEmail={
                                    'test@test.com'
                                }
                                contactPhone='012-3404949-494'
                                dismissButtonLabel={
                                    'Dismiss'
                                }
                                onDismiss={
                                    () => {
                                        console.log('Dismiss function called')
                                    }
                                }
                                WorkflowCardBaseProps={{
                                    loading: false,
                                    backgroundImage: EatonLogo,
                                }}
                                WorkflowCardHeaderProps={{
                                    avatar: <Fan />,
                                    action: <Home />,
                                    title: 'This is a Contact Header',
                                }}
                                WorkflowCardInstructionProps={
                                    {
                                        instructions: 'This is a Contact Screen',
                                        divider: false,
                                        title: 'This is contact screen title'
                                    }
                                }
                                WorkflowCardActionsProps={{
                                    divider: false,
                                    showPrevious: true,
                                    canGoPrevious: true,
                                    previousLabel: 'prev',
                                    onPrevious: (): void => {
                                        console.log('Previous button called');
                                    },
                                    showNext: true,
                                    canGoNext: true,
                                    nextLabel: 'next',
                                    onNext: (): void => {
                                        console.log('Next button called');
                                    },
                                    currentStep: 1,
                                    totalSteps: 3,
                                    fullWidthButton: true
                                }}
                            /> */}
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
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={app.language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions()}
                        i18n={i18nAppInstance}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route path={'/self-registration'} element={<RegistrationWorkflow />} />
                <Route path={'/register-by-invite'} element={<RegistrationWorkflow isInviteRegistration />} />
            </Route>
        </Routes>
    );
};
