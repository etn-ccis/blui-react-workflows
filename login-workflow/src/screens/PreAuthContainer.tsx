import React, { useCallback } from 'react';
import { useInjectedUIContext, useSecurityState } from '@brightlayer-ui/react-auth-shared';
import { useRoutes } from '../contexts/RoutingContext';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';

/**
 * Container component that renders all of the screens for the
 * pre-authentication (Login, registration, forgot password, etc.)
 *
 * @category Component
 */
export const PreAuthContainer: React.FC = () => {
    const securityState = useSecurityState();
    const { routes } = useRoutes();
    const location = useLocation();
    const {
        enableResetPassword = true,
        showContactSupport = true,
        enableInviteRegistration = true,
        showSelfRegistration = true,
    } = useInjectedUIContext();

    const RedirectToLogin = useCallback((): JSX.Element => <Redirect to={routes.LOGIN} />, [routes]);

    // If the user is authenticated, redirect back to wherever they came from (or the home page)
    if (securityState.isAuthenticatedUser) {
        // @ts-ignore
        const { from } =
            // @ts-ignore
            location && location.state && 'from' in location.state ? location.state : { from: { pathname: '/' } };
        return <Redirect to={from} />;
    }

    return (
        <Switch>
            <Route exact path={routes.LOGIN} component={Login} />
            <Route
                exact
                path={routes.FORGOT_PASSWORD}
                component={enableResetPassword ? ForgotPassword : RedirectToLogin}
            />
            <Route
                exact
                path={routes.RESET_PASSWORD}
                component={enableResetPassword ? ResetPassword : RedirectToLogin}
            />
            <Route
                exact
                path={routes.REGISTER_INVITE}
                component={enableInviteRegistration ? InviteRegistrationPager : RedirectToLogin}
            />
            <Route
                exact
                path={routes.REGISTER_SELF}
                component={showSelfRegistration ? SelfRegistrationPager : RedirectToLogin}
            />
            <Route exact path={routes.SUPPORT} component={showContactSupport ? ContactSupport : RedirectToLogin} />
        </Switch>
    );
};
