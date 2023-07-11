/* eslint-disable */
import React from 'react';
import {
    RouteConfig,
    ExperimentalAuthGuard,
    ExperimentalGuestGuard,
    SecurityContextProvider,
} from '@brightlayer-ui/react-auth-workflow';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
    AuthTestScreen,
    SuccessScreenBaseTest,
    AccountDetailsScreenBaseTest,
    SetPasswordScreen,
    LoginScreenBaseTest,
    CreateAccountScreenBaseTest,
    RegistrationWorkflowScreen,
    VerifyCodeScreenBaseTest,
    GuardedScreen,
    ContactScreenBaseTest,
    RegistrationTestScreen,
    ChangePasswordDialogBaseTest,
    ResetPasswordScreen,
    CreatePasswordScreenTest,
    ForgotPasswordScreenBaseTest,
    EulaScreenBaseTest,
    LoginScreenFullScreenTest,
    ResetPasswordFullScreen,
    ForgotPasswordFullScreen,
    ContactSupportScreenFullScreen,
    ChangePasswordDialogTest,
    ExistingAccountSuccessScreenTest,
    Login,
} from '../screens';
import { DebugScreen } from '../screens/new-architecture-test-screens/DebugScreen';

export const routes: RouteConfig = {
    LOGIN: '/login',
};

type CustomRouterProps = {
    isAuthenticated: boolean;
    baseName?: string;
};

export const GetCustomRoutes = (isAuthenticated: boolean) => {
    const customRoutes = [
        // Non-Authenticated Route: accessible only if the user is NOT authenticated
        {
            path: '/login',
            element: (
                <ExperimentalGuestGuard
                    isAuthenticated={isAuthenticated}
                    fallbackComponent={<Navigate to={`/guarded`} />}
                >
                    <SecurityContextProvider>
                        <Login />
                    </SecurityContextProvider>
                </ExperimentalGuestGuard>
            ),
        },
        {
            path: '/debug',
            element: <DebugScreen />,
        },
        // Non-Authenticated Routes: accessible only if the user is NOT authenticated
        {
            path: `/login-screen-base`,
            element: <LoginScreenBaseTest />,
        },
        {
            path: `/login-screen-full`,
            element: (
                <SecurityContextProvider>
                    <LoginScreenFullScreenTest />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/auth-provider-test`,
            element: (
                <SecurityContextProvider>
                    <AuthTestScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/registration-provider-test`,
            element: <RegistrationTestScreen />,
        },
        {
            path: `/contact-us`,
            element: <ContactScreenBaseTest />,
        },
        {
            path: `/registration-workflow`,
            element: (
                <SecurityContextProvider>
                    <RegistrationWorkflowScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/set-password`,
            element: (
                <SecurityContextProvider>
                    <SetPasswordScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/reset-password`,
            element: (
                <SecurityContextProvider>
                    <ResetPasswordScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/create-password`,
            element: (
                <SecurityContextProvider>
                    <CreatePasswordScreenTest />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/verify-code-test`,
            element: <VerifyCodeScreenBaseTest />,
        },
        {
            path: `/account-details-screen-test`,
            element: <AccountDetailsScreenBaseTest />,
        },
        {
            path: `/create-account`,
            element: <CreateAccountScreenBaseTest />,
        },
        {
            path: `/forgot-password`,
            element: <ForgotPasswordScreenBaseTest />,
        },
        // Authenticated Route: accessible only if the user IS authenticated
        {
            path: `/guarded`,
            element: (
                <ExperimentalAuthGuard isAuthenticated={isAuthenticated} fallbackComponent={<Navigate to={`/login`} />}>
                    <GuardedScreen />
                </ExperimentalAuthGuard>
            ),
        },
        // 404? redirect to '/' for Login?
        {
            path: '*',
            element: <Navigate to={`/login`} />,
        },
        {
            path: `/success-screen`,
            element: <SuccessScreenBaseTest />,
        },
        {
            path: `/change-password-dialog-base`,
            element: <ChangePasswordDialogBaseTest />,
        },
        {
            path: `/eula-screen-test`,
            element: <EulaScreenBaseTest />,
        },
        {
            path: `/reset-password-full-screen`,
            element: (
                <SecurityContextProvider>
                    <ResetPasswordFullScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/forgot-password-full-screen`,
            element: (
                <SecurityContextProvider>
                    <ForgotPasswordFullScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/contact-support-full-screen`,
            element: (
                <SecurityContextProvider>
                    <ContactSupportScreenFullScreen />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/change-password-dialog`,
            element: (
                <SecurityContextProvider>
                    <ChangePasswordDialogTest />
                </SecurityContextProvider>
            ),
        },
        {
            path: `/existing-account-success-screen`,
            element: (
                <SecurityContextProvider>
                    <ExistingAccountSuccessScreenTest />
                </SecurityContextProvider>
            ),
        },
    ];
    return customRoutes;
};

export const CustomRouterWithUnbiasedAuthGuard = ({
    isAuthenticated,
    baseName = '',
}: CustomRouterProps): JSX.Element => {
    const router = createBrowserRouter(
        [
            // ...getDefaultPageRoutes,
            // Non-Authenticated Route: accessible only if the user is NOT authenticated
            {
                path: `/debug`,
                element: (
                    <ExperimentalGuestGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/guarded`} />}
                    >
                        <DebugScreen />
                    </ExperimentalGuestGuard>
                ),
            },
            // Accessible from anywhere
            {
                path: `/contact-us`,
                element: <ContactScreenBaseTest />,
            },
            // Authenticated Route: accessible only if the user IS authenticated
            {
                path: `/guarded`,
                element: (
                    <ExperimentalAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/debug`} />}
                    >
                        <GuardedScreen />
                    </ExperimentalAuthGuard>
                ),
            },
            // 404? redirect to '/' for debug?
            {
                path: '*',
                element: <Navigate to={`/debug`} />,
            },
        ],
        { basename: baseName }
    );

    return <RouterProvider router={router} />;
};
