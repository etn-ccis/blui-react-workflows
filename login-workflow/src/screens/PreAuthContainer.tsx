import React from 'react';
import { Login } from './Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { ResetPassword } from './ResetPassword';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';
import { useSecurityState } from '@pxblue/react-auth-shared';
import { useRoutes } from '../contexts/RoutingContext';

export const PreAuthContainer: React.FC = () => {
    const securityState = useSecurityState();
    const { routes } = useRoutes();
    const location = useLocation();
    if (securityState.isAuthenticatedUser) {
        const { from } =
            location && location.state && 'from' in location.state ? location.state : { from: { pathname: '/' } };
        return <Redirect to={from} />;
    }

    return (
        <Switch>
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
            <Route exact path={routes.RESET_PASSWORD} component={ResetPassword} />
            <Route exact path={routes.REGISTER_INVITE} component={InviteRegistrationPager} />
            <Route exact path={routes.REGISTER_SELF} component={SelfRegistrationPager} />
            <Route exact path={routes.SUPPORT} component={ContactSupport} />
        </Switch>
    );
};
