import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ReactRouterAuthGuardProps = {
    children?: JSX.Element;
    isAuthenticated: boolean;
    fallBackUrl: string;
};

/**
 * Component that renders a conditional Route. If the user is not authenticated, this route
 * will redirect to the route specified by user using fallBackUrl prop. If the user is authenticated, it will render the provided
 * content.
 * @param children The element/route to render if the user is authenticated
 * @param isAuthenticated Indicates whether the user is authenticated or not
 * @param fallBackUrl URL where to redirect if user is not authenticated
 *
 * @category Component
 */

export const ReactRouterAuthGuard = (props: ReactRouterAuthGuardProps): JSX.Element | null => {
    const { children = null, fallBackUrl, isAuthenticated } = props;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={fallBackUrl} replace state={{ from: location }} />;
    }

    return children;
};
