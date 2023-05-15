/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAuth } from '../contexts/AuthContextProvider';
import { ContactUs } from '../screens/routing-test-screens/ContactUs';
import { GuardedScreen } from '../screens/routing-test-screens/GuardedScreen';
import { LoginScreen } from '../screens/routing-test-screens/LoginScreen';
import { RouteConfig, ExperimentalAuthGuard, ExperimentalGuestGuard } from '@brightlayer-ui/react-auth-workflow';
import { Navigate, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';

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

export const customRouter = ({ isAuthenticated, baseName = '' }: CustomRouterProps): any =>
    createBrowserRouter(
        [
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
                key: 'login',
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
