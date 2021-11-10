import React from 'react';
import { useSecurityState } from '@brightlayer-ui/react-auth-shared';
import { RouteProps, useLocation, Route, Redirect } from 'react-router-dom';

type PrivateRouteProps = RouteProps & {
    authRoute: string;
};

/**
 * Component that renders a conditional Route. If the user is not authenticated, this route
 * will redirect to the login route. If the user is authenticated, it will render the provided
 * content.
 *
 * @param authRoute The route to redirect to when the user is not authenticated
 *
 * @category Component
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { children, ...other } = props;
    const securityState = useSecurityState();
    const location = useLocation();

    if (!securityState.isAuthenticatedUser) {
        return (
            <Route {...other}>
                <Redirect to={{ pathname: props.authRoute, state: { from: location } }} />
            </Route>
        );
    }

    return <Route {...other}>{children}</Route>;
};
