import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';

type ReactAuthGuardProps = {
    children: JSX.Element;
    isAuthenticated: boolean;
    fallBackUrl: string,
};

export const ReactAuthGuard = (props: ReactAuthGuardProps): JSX.Element  | null => {
    const { children, fallBackUrl, isAuthenticated  } = props;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(fallBackUrl, { replace: true, state: { from: location } });
        }
    }, [navigate, location, fallBackUrl]);

    return children;
};
