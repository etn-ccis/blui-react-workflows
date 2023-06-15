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
    LoginScreen,
    ChangePasswordDialogBaseTest,
    ResetPasswordScreen,
    CreatePasswordScreenTest,
    ForgotPasswordScreenBaseTest,
    EulaScreenBaseTest,
    ResetPasswordFullScreen,
} from '../screens';

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
            path: `/login`,
            element: (
                <ExperimentalGuestGuard
                    isAuthenticated={isAuthenticated}
                    fallbackComponent={<Navigate to={`/guarded`} />}
                >
                    <LoginScreen />
                </ExperimentalGuestGuard>
            ),
        },
        // Non-Authenticated Route: accessible only if the user is NOT authenticated
        {
            path: `/login-screen-base`,
            element: <LoginScreenBaseTest />,
        },
        // Non-Authenticated Route: accessible only if the user is NOT authenticated
        {
            path: `/registration-test`,
            element: (
                <ExperimentalGuestGuard
                    isAuthenticated={isAuthenticated}
                    fallbackComponent={<Navigate to={`/login`} />}
                >
                    <RegistrationTestScreen />
                </ExperimentalGuestGuard>
            ),
        },
        // Non-Authenticated Route: accessible only if the user is NOT authenticated
        {
            path: `/auth-test`,
            element: (
                <ExperimentalGuestGuard
                    isAuthenticated={isAuthenticated}
                    fallbackComponent={<Navigate to={`/login`} />}
                >
                    <SecurityContextProvider>
                        <AuthTestScreen />
                    </SecurityContextProvider>
                </ExperimentalGuestGuard>
            ),
        },
        // Accessible from anywhere
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
            path: `/change-password-dialog`,
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
                path: `/login`,
                element: (
                    <ExperimentalGuestGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/guarded`} />}
                    >
                        <LoginScreen />
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
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <GuardedScreen />
                    </ExperimentalAuthGuard>
                ),
            },
            // 404? redirect to '/' for Login?
            {
                path: '*',
                element: <Navigate to={`/login`} />,
            },
        ],
        { basename: baseName }
    );

    return <RouterProvider router={router} />;
};
