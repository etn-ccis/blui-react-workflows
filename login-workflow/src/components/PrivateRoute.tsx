import React from 'react';
import { RouteProps, useLocation, Route, Redirect } from 'react-router-dom';
import { useSecurityState } from '@pxblue/react-auth-shared';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    const { children, ...other } = props;
    const securityState = useSecurityState();
    const location = useLocation();

    if (!securityState.isAuthenticatedUser) {
        return (
            <Route {...other}>
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
            </Route>
        );
    }

    return <Route {...other}>{children}</Route>;
};
