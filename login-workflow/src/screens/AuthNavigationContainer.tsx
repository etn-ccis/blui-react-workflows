/**
 * @packageDocumentation
 * @module Screens
 */

import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { Splash as SplashScreen } from './Splash';
import { PreAuthContainer } from './PreAuthContainer';
// import { ChangePassword } from '../screens/ChangePassword';

// Shared Auth Logic
import {
    // Store
    AuthUIInternalStore,
    // Hooks
    useSecurityState,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { ChangePasswordModal } from '../components/password/ChangePasswordModal';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';

const NavigationContainer: React.FC = (props) => <>{props.children}</>;

/**
 * Type for the properties of the navigation container.
 */
type NavigationContainerComponentProps = React.ComponentProps<'div'>; // React.ComponentProps<typeof NavigationContainer>;

/**
 * Container component which holds the authentication and navigation state
 * designed for mobile apps.
 * This should be rendered at the root wrapping the whole app.
 * Any valid NavigationContainer props can be added.
 *
 * ```typescript
 * // Initial state can be mapped to a specific auth screen to pass in
 * // codes if needed. Use useLinking with a similar linking options
 * export const authLinkMapping: LinkingOptions = {
 *     prefixes: ['https://authui.com', 'authui://'],
 *     config: {
 *         Login: 'login',
 *         PasswordResetInitiation: 'password/reset/initiate',
 *         // email can be passed in as parameter if needed for the api
 *         PasswordResetCompletion: 'password/reset/:code',
 *         // email can be passed in as parameter if needed for the api
 *         RegistrationInvite: 'invite/:code',
 *         // email can be passed in as parameter if needed for the api
 *         Registration: 'register/:code',
 *         SupportContact: 'support',
 *     },
 * };
 * ```
 *
 * @param props.initialState Initial state object for the navigation tree.
 * @param props.onStateChange Callback which is called with the latest navigation state when it changes.
 * @param props.theme Theme object for the navigators.
 * @param props.children Child elements to render the content.
 * @param props.ref Ref object which refers to the navigation object containing helper methods.
 *
 * @category Component
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const AuthNavigationContainerRender: React.ForwardRefRenderFunction<{}, NavigationContainerComponentProps> = (
    props: NavigationContainerComponentProps,
    ref: any
) => {
    const securityState = useSecurityState();
    const injectedContext = useInjectedUIContext();

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
            return;
        };

        void bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (securityState.isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen /*mainImage={injectedContext.projectImage}*/ />;
    }

    // const appShouldBeVisible = securityState.isAuthenticatedUser; // && !securityState.isShowingChangePassword;

    // Show the change password screen regardless of state if true
    // Show PreAuthContainer unless the user is authenticated
    // Show the application
    return (
        <NavigationContainer ref={ref} {...props}>
            <AuthUIInternalStore>
                <BrowserRouter>
                    <Switch>
                        <Route
                            path={[
                                '/login',
                                '/forgot-password',
                                '/reset-password',
                                '/register/invite',
                                '/register/create-account',
                                '/support',
                            ]}
                        >
                            <PreAuthContainer />
                        </Route>
                        <PrivateRoute path="*">{props.children}</PrivateRoute>
                    </Switch>
                    {securityState.isAuthenticatedUser && <ChangePasswordModal />}
                </BrowserRouter>
            </AuthUIInternalStore>
        </NavigationContainer>
    );
};

export const AuthNavigationContainer = React.forwardRef(AuthNavigationContainerRender);
