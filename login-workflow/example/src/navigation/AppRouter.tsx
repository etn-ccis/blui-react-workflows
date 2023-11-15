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
    SiteOptionsScreenBase,
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
import DomainIcon from '@mui/icons-material/Domain';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow>
                            <SiteOptionsScreenBase
                                icon={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100px',
                                            height: '100px',
                                            backgroundColor: '#e0eff8',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <DomainIcon color={'primary'} sx={{ fontSize: 54 }} />
                                    </Box>
                                }
                                message={
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            {`Now that you've specified your account details, you need to add your Organization details.`}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            {`If you want to create a new Organization, choose Create a New Organization below.`}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            {`If your Organization already exists, ask your administrator to provide you with the Registration
                                            Code and choose Join Existing Organization below.`}
                                        </Typography>
                                    </>
                                }
                                createNewOrgLabel="Create a New Organization"
                                joinExistingOrgLabel="Join Existing Organization"
                                WorkflowCardHeaderProps={{
                                    title: 'Join an Organization',
                                }}
                                onCreateNewOrg={() => {
                                    console.log('new organization');
                                }}
                                onJoinExistingOrg={() => {
                                    console.log('existing');
                                }}
                            />
                        </RegistrationWorkflow>
                    }
                />
                <Route path={'/register-by-invite'} element={<RegistrationWorkflow isInviteRegistration />} />
            </Route>
        </Routes>
    );
};
