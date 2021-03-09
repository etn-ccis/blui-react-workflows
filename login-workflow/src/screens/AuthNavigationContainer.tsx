import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthUIInternalStore, useSecurityState, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { Splash as SplashScreen } from './Splash';
import { PreAuthContainer } from './PreAuthContainer';
import { ChangePasswordModal, PrivateRoute } from '../components';
import { RoutingContext } from '../contexts/RoutingContext';

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
    extraRoutes?: JSX.Element;
};

const defaultRoutes: Required<RouteConfig> = {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    REGISTER_INVITE: '/register/invite',
    REGISTER_SELF: '/register/create-account',
    SUPPORT: '/support',
};

/* Ensures that all routes supplied by the user start with a forward slash */
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
 * for the web application.
 * This should be rendered at the root wrapping the whole app.
 * The routes used for the login and registration screens can be customized
 * if desired
 *
 * @param routeConfig Specifies the mapping of screens to URLs
 * @param extraRoutes Specifies additional routes that should be accessible without logging in
 * @param children Main application content.
 *
 * @category Component
 */
export const AuthNavigationContainer: React.FC<NavigationContainerComponentProps> = (props) => {
    const securityState = useSecurityState();
    const injectedContext = useInjectedUIContext();
    const { routeConfig, extraRoutes, children, ...otherProps } = props;

    useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
            return;
        };

        void bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { routes, routesArray: publicRoutes } = prefixRoutes({ ...defaultRoutes, ...routeConfig });

    // Show the splash loading screen until we have loaded the initial authentication state
    if (securityState.isLoading) {
        return <SplashScreen mainImage={injectedContext.projectImage} />;
    }

    return (
        <AuthUIInternalStore {...otherProps}>
            <BrowserRouter>
                <RoutingContext.Provider value={{ routes: routes }}>
                    <Switch>
                        <Route path={publicRoutes}>
                            {/* Routes defined in the routeConfig render the preAuth container */}
                            <PreAuthContainer />
                        </Route>
                        {extraRoutes}
                        <PrivateRoute path="*" authRoute={routes.LOGIN}>
                            {/* Other routes render the main application */}
                            {children}
                        </PrivateRoute>
                    </Switch>
                    {/* If the user is authenticated, the change password modal is accessible */}
                    {securityState.isAuthenticatedUser && <ChangePasswordModal />}
                </RoutingContext.Provider>
            </BrowserRouter>
        </AuthUIInternalStore>
    );
};
