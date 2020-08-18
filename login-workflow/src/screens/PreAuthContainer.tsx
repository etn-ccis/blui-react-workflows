import React from 'react';
import { Login } from './Login';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { ResetPassword } from './ResetPassword';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';
import { useSecurityState } from '@pxblue/react-auth-shared';

export const PreAuthContainer: React.FC = () => {
    const securityState = useSecurityState();
    const location = useLocation();

    if (securityState.isAuthenticatedUser) {
        const { from } =
            location && location.state && 'from' in location.state ? location.state : { from: { pathname: '/' } };
        return <Redirect to={from} />;
    }

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path={'/register/invite'} component={InviteRegistrationPager} />
            <Route exact path={'/register/create-account'} component={SelfRegistrationPager} />
            <Route exact path={'/support'} component={ContactSupport} />
        </Switch>
    );
};
