import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ReactRouterGuestProps = {
    children?: JSX.Element;
    isAuthenticated: boolean;
    fallBackUrl: string;
};

/**
 * Component that renders a conditional Route. If the user is already authenticated, this route
 * will redirect back to the prior route. If the user is not authenticated, it will render the provided
 * content.
 *
 * @param children The element/route to render if the user is not authenticated
 * @param isAuthenticated Indicates whether the user is authenticated or not
 * @param fallBackUrl URL where to redirect if user is authenticated
 *
 * @category Component
 */

export const ReactRouterGuestGuard = (props: ReactRouterGuestProps): JSX.Element | null => {
    const { children, isAuthenticated, fallBackUrl } = props;
    const location = useLocation();
    if (isAuthenticated) {
        const redirectedURL = location.state?.from ?? fallBackUrl;
        return <Navigate to={redirectedURL} replace />;
    }

    return children;
};
