/* eslint-disable */
import React from 'react';
import { RouteConfig, ExperimentalAuthGuard, ExperimentalGuestGuard } from '@brightlayer-ui/react-auth-workflow';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../screens/new-architecture-test-screens/LoginScreen';
import { RegistrationTestScreen } from '../screens/new-architecture-test-screens/RegistrationTestScreen';
import { ContactUs } from '../screens/new-architecture-test-screens/ContactUs';
import { GuardedScreen } from '../screens/new-architecture-test-screens/GuardedScreen';

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
        // Accessible from anywhere
        {
            path: `/contact-us`,
            element: <ContactUs />,
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
