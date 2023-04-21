import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthUIInternalStore, useSecurityState, useInjectedUIContext } from '@brightlayer-ui/react-auth-shared';
import { Splash as SplashScreen } from '../screens/Splash';
import { ChangePasswordModal, AuthGuard, BrandedCardContainer } from '../components';
import { RoutingContext } from '../contexts/RoutingContext';
import { GuestGuard } from '../components/GuestGuard';
import { ForgotPassword } from '../screens/ForgotPassword';
import { ResetPassword } from '../screens/ResetPassword';
import { InviteRegistrationPager } from '../screens/InviteRegistrationPager';
import { SelfRegistrationPager } from '../screens/SelfRegistrationPager';
import { ContactSupport } from '../screens/subScreens/ContactSupport';
import { Login } from '../screens/Login';

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
    extraRoutes?: JSX.Element[];
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
export const AuthNavigationContainer: React.FC<
    React.PropsWithChildren<React.PropsWithChildren<NavigationContainerComponentProps>>
> = (props) => {
    const securityState = useSecurityState();
    const injectedContext = useInjectedUIContext();
    const { routeConfig, extraRoutes, children, ...otherProps } = props;
    const {
        enableResetPassword = true,
        showContactSupport = true,
        enableInviteRegistration = true,
        showSelfRegistration = true,
    } = injectedContext;

    useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            await injectedContext.authActions().initiateSecurity();
            return;
        };

        void bootstrapAsync();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { routes } = prefixRoutes({ ...defaultRoutes, ...routeConfig });
    const extraRoutesPathnames = extraRoutes ? extraRoutes.map((route) => route.props.path) : [];

    // Show the splash loading screen until we have loaded the initial authentication state
    if (securityState.isLoading && !extraRoutesPathnames.includes(window.location.pathname)) {
        return <SplashScreen mainImage={injectedContext.projectImage} />;
    }

    const RedirectToLogin = <Navigate to={routes.LOGIN} replace />;

    return (
        <AuthUIInternalStore {...otherProps}>
            <RoutingContext.Provider value={{ routes: routes }}>
                <BrowserRouter>
                    <Routes>
                        {/* Screens visible for non-logged in users */}
                        <>
                            <Route
                                path={routes.LOGIN}
                                element={
                                    <GuestGuard>
                                        <Login />
                                    </GuestGuard>
                                }
                            />
                            <Route
                                path={routes.FORGOT_PASSWORD}
                                element={
                                    <GuestGuard>
                                        {enableResetPassword ? <ForgotPassword /> : RedirectToLogin}
                                    </GuestGuard>
                                }
                            />
                            <Route
                                path={routes.RESET_PASSWORD}
                                element={
                                    <GuestGuard>{enableResetPassword ? <ResetPassword /> : RedirectToLogin}</GuestGuard>
                                }
                            />
                            <Route
                                path={routes.REGISTER_INVITE}
                                element={
                                    <GuestGuard>
                                        {enableInviteRegistration ? <InviteRegistrationPager /> : RedirectToLogin}
                                    </GuestGuard>
                                }
                            />
                            <Route
                                path={routes.REGISTER_SELF}
                                element={
                                    <GuestGuard>
                                        {showSelfRegistration ? <SelfRegistrationPager /> : RedirectToLogin}
                                    </GuestGuard>
                                }
                            />
                            <Route
                                path={routes.SUPPORT}
                                element={
                                    <GuestGuard>
                                        {showContactSupport ? (
                                            <BrandedCardContainer>
                                                <ContactSupport />
                                            </BrandedCardContainer>
                                        ) : (
                                            RedirectToLogin
                                        )}
                                    </GuestGuard>
                                }
                            />
                        </>

                        {/* Additional public routes specified by the user accessible whether logged in or not */}
                        {extraRoutes}

                        {/* Main user application content routes, behind authentication guard */}
                        <Route path={'*'} element={<AuthGuard />}>
                            {children}
                        </Route>
                    </Routes>

                    {/* If the user is authenticated, the change password modal is accessible */}
                    {securityState.isAuthenticatedUser && <ChangePasswordModal />}
                </BrowserRouter>
            </RoutingContext.Provider>
        </AuthUIInternalStore>
    );
};
