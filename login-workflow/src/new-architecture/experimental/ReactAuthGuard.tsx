import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ReactAuthGuardProps = {
    children?: JSX.Element;
    isAuthenticated: boolean;
    fallBackUrl: string;
};

export const ReactAuthGuard = (props: ReactAuthGuardProps): JSX.Element | null => {
    const { children, fallBackUrl, isAuthenticated } = props;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={fallBackUrl} replace state={{ from: location }} />;
    }

    return children ? children : <Outlet />;
};
