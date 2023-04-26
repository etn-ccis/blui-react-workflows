import React, { useEffect } from 'react';
import { useSecurityState } from '../auth-shared';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRoutes } from '../contexts/RoutingContext';

/**
 * Component that renders a conditional Route. If the user is not authenticated, this route
 * will redirect to the login route. If the user is authenticated, it will render the provided
 * content.
 *
 * @category Component
 */
export const AuthGuard = (): JSX.Element | null => {
    const securityState = useSecurityState();
    const location = useLocation();
    const { routes } = useRoutes();
    const navigate = useNavigate();

    useEffect(() => {
        if (!securityState.isAuthenticatedUser) {
            navigate(routes.LOGIN, { replace: true, state: { from: location } });
        }
    }, [securityState, navigate, location, routes.LOGIN]);

    return <Outlet />;
};
