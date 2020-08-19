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
import { RoutingContext } from '../contexts/RoutingContext';

/**
 * Type for the properties of the navigation container.
 */
export type RouteConfig = {
    LOGIN?: string;
    FORGOT_PASSWORD?: string;
    RESET_PASSWORD?: string;
    REGISTER_INVITE?: string;
    REGISTER_SELF?: string;
    SUPPORT?: string;
};
export type NavigationContainerComponentProps = {
    routeConfig?: RouteConfig;
};

const defaultRoutes: Required<RouteConfig> = {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    REGISTER_INVITE: '/register/invite',
    REGISTER_SELF: '/register/create-account',
    SUPPORT: '/support',
};

const prefixRoutes = (routes: RouteConfig): { routes: Required<RouteConfig>; routesArray: string[] } => {
    const newRoutes = defaultRoutes;
    const newRoutesArray: string[] = [];
    Object.keys(routes).forEach((route) => {
        const customPath = routes[route as keyof RouteConfig];
        const routeWithPrefix = `${customPath.startsWith('/') ? '' : '/'}${customPath}`;
        newRoutes[route as keyof RouteConfig] = routeWithPrefix;
    });
    Object.keys(newRoutes).forEach((route) => {
        newRoutesArray.push(newRoutes[route as keyof RouteConfig]);
    });
    return { routes: newRoutes, routesArray: newRoutesArray };
};

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
 * @param props.children Child elements to render the content.
 *
 * @category Component
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const AuthNavigationContainer: React.FC<NavigationContainerComponentProps> = (props) => {
    const securityState = useSecurityState();
    const injectedContext = useInjectedUIContext();
    const { routeConfig, children, ...otherProps } = props;

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
            return;
        };

        void bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { routes, routesArray } = prefixRoutes({ ...defaultRoutes, ...routeConfig });

    // Object.keys(routes).forEach((route) => {
    //     const routePath = routes[route as keyof RouteConfig];
    //     const newRoute = `${routePath.startsWith('/') ? '' : '/'}${routePath}`;
    //     publicRoutes.push(newRoute);
    // });

    if (securityState.isLoading) {
        // We haven't finished checking for the token yet
        return <SplashScreen /*mainImage={injectedContext.projectImage}*/ />;
    }

    // const appShouldBeVisible = securityState.isAuthenticatedUser; // && !securityState.isShowingChangePassword;

    // Show the change password screen regardless of state if true
    // Show PreAuthContainer unless the user is authenticated
    // Show the application
    return (
        <AuthUIInternalStore {...otherProps}>
            <BrowserRouter>
                <RoutingContext.Provider value={{ routes: routes }}>
                    <Switch>
                        <Route
                            path={
                                routesArray
                                //     [
                                //     '/login',
                                //     '/forgot-password',
                                //     '/reset-password',
                                //     '/register/invite',
                                //     '/register/create-account',
                                //     '/support',
                                // ]
                            }
                        >
                            <PreAuthContainer />
                        </Route>
                        <PrivateRoute path="*" authRoute={routes.LOGIN}>
                            {children}
                        </PrivateRoute>
                    </Switch>
                    {securityState.isAuthenticatedUser && <ChangePasswordModal />}
                </RoutingContext.Provider>
            </BrowserRouter>
        </AuthUIInternalStore>
    );
};
