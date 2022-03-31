import React, { useEffect } from 'react';
import { useSecurityState } from '@brightlayer-ui/react-auth-shared';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type AuthGuardProps = {
    authRoute: string;
};

/**
 * Component that renders a conditional Route. If the user is not authenticated, this route
 * will redirect to the login route. If the user is authenticated, it will render the provided
 * content.
 *
 * @param authRoute The route to redirect to when the user is not authenticated
 * @param children The element/route to render if the user is authenticated
 *
 * @category Component
 */
export const AuthGuard = ({ authRoute }: AuthGuardProps): JSX.Element | null => {
    const securityState = useSecurityState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!securityState.isAuthenticatedUser) {
            navigate(authRoute, { replace: true, state: { from: location } });
        }
    }, [securityState, navigate, location, authRoute]);

    return <Outlet />;
};
