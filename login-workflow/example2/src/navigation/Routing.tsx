/* eslint-disable */
import React from 'react';
import {
    RouteConfig,
    ExperimentalAuthGuard,
    ExperimentalGuestGuard,
    SecurityContextProvider,
} from '@brightlayer-ui/react-auth-workflow';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../screens/new-architecture-test-screens/LoginScreen';
import { RegistrationTestScreen } from '../screens/new-architecture-test-screens/RegistrationTestScreen';
import { ContactUs } from '../screens/new-architecture-test-screens/ContactUs';
import { GuardedScreen } from '../screens/new-architecture-test-screens/GuardedScreen';
import { VerifyCodeScreenBaseTest } from '../screens/new-architecture-test-screens/VerifyCodeScreenBase';
import { AuthTestScreen, SuccessScreenBaseTest, AccountDetailsScreenBaseTest } from '../screens';
import { LoginScreenBaseTest } from '../screens/new-architecture-test-screens/LoginScreenBase';
import { CreateAccountScreenBaseTest } from '../screens/new-architecture-test-screens/CreateAccountScreenBase';
import { AuthTestScreen, SuccessScreenBaseTest } from '../screens';
import { SetPasswordScreen } from '../screens/new-architecture-test-screens/SetPasswordScreen';

export const routes: RouteConfig = {
    LOGIN: '/custom-login-route',
    FORGOT_PASSWORD: '/custom-forgot-password-route',
    RESET_PASSWORD: '/custom-reset-password-route',
    REGISTER_INVITE: '/custom-register-by-invite-route',
    REGISTER_SELF: '/custom-self-registration-route',
    SUPPORT: '/custom-contact-support-route',
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
            element: <ContactUs />,
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
                element: <ContactUs />,
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
