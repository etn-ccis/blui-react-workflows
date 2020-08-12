import React from 'react';
import { Login } from './Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ResetPasswordNav } from './ResetPassword/ResetPasswordNav';
import { ResetPasswordHandleDeepLink } from './ResetPassword/ResetPasswordHandleDeepLink';
import { InviteRegistrationPager } from './InviteRegistrationPager';
import { SelfRegistrationPager } from './SelfRegistrationPager';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';

export const PreAuthContainer: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password">
                    <Switch>
                        <Route exact path="/reset-password">
                            <ResetPasswordNav
                            // contactEmail={authProps.contactEmail ?? 'exampleSupport@eaton.com'}
                            // contactPhone={authProps.contactPhone ?? '1-888-EXA-TEST'}
                            />
                        </Route>
                        <Route exact path="/reset-password/complete" component={ResetPasswordHandleDeepLink} />
                    </Switch>
                </Route>
                <Route exact path={'/register/invite'} component={InviteRegistrationPager} />
                <Route exact path={'/register/create-account'} component={SelfRegistrationPager} />
                <Route exact path={'/support'}>
                    <ContactSupport
                    // contactEmail={authProps.contactEmail ?? 'exampleSupport@eaton.com'}
                    // contactPhone={authProps.contactPhone ?? '1-888-EXA-TEST'}
                    />
                </Route>
                <Route path={'*'}>
                    <Redirect to={'/login'} />
                </Route>
            </Switch>
        </Router>
    );
};
