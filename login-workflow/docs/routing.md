# Routing

This library does not prescribe which routing solution you use, however we recommend using [React Router](https://reactrouter.com/).

## Usage
Declare the custom routes to use for any or all of the screens in the workflow. 

```tsx
import { RouteConfig } from '@brightlayer-ui/react-auth-workflow';

export const routes: RouteConfig = {
    LOGIN: '/login',
    REGISTER_INVITE: '/register-by-invite',
    REGISTER_SELF: '/self-registration',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
};
```
### Authentication

To set up Authentication in your app you will need to import the `AuthContextProvider` and pass in the necessary props. You will pass in your routes as children to the `AuthContextProvider`. More information about React Auth Workflow's exported objects and functions can found in the [API](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/API.md) documentation.

#### Example Usage

Here is an example of how you would set this up using our recommended routing solution, [React Router](https://reactrouter.com/):

```tsx
import React from 'react';
import {
    AuthContextProvider,
    ContactSupportScreen,
    ForgotPasswordScreen,
    ResetPasswordScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { routes } from '../navigation/Routing';
import { i18nAppInstance } from './i18n';
export const AppRouter: React.FC = () => {
   // Language will be managed by some state within your app, in this example, a useApp hook that gets the app language.
    const { language } = useApp();
    const navigate = useNavigate();
    const app = useApp();
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(app)}
                        language={language}
                        navigate={navigate}
                        routeConfig={routes}
                        i18n={i18nAppInstance}
                        rememberMeDetails={{ email: rememberMe ? email : '', rememberMe: rememberMe }}
                    >
                        <Outlet />
                    </AuthContextProvider>
                }
            >
                <Route
                    path={'/login'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <Login />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/forgot-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ForgotPasswordScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/contact-support'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ContactSupportScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                <Route
                    path={'/reset-password'}
                    element={
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <ResetPasswordScreen />
                        </ReactRouterGuestGuard>
                    }
                />
                ...
            </Route>
        </Routes>
    );
};
```
### Registration

To set up Registration in your app you will need to import the `RegistrationContextProvider` and pass in the necessary props. You will pass in your routes as children to the `RegistrationContextProvider`. More information about React Auth Workflow's exported objects and functions can found in the [API](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/API.md) documentation.

#### Example Usage

```tsx
import React from 'react';
import {
    RegistrationContextProvider,
    RegistrationWorkflow,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from '../navigation/Routing';
import { i18nAppInstance } from './i18n';

export const AppRouter: React.FC = () => {
    // Language will be managed by some state within your app, in this example, a useApp hook that gets the app language.
    const { language } = useApp();
    const navigate = useNavigate();
    return (
        <Routes>
            {/* REGISTRATION ROUTES */}
            <Route
                element={
                    <RegistrationContextProvider
                        language={language}
                        routeConfig={routes}
                        navigate={navigate}
                        actions={ProjectRegistrationUIActions}
                        i18n={i18nAppInstance}
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow />
                    }
                />
                <Route path={'/register-by-invite'} element={<RegistrationWorkflow isInviteRegistration />} />
            </Route>
        </Routes>
    );
};
```

#### Available Customizations / Configurations

### Protecting Your Application Routes

If there are routes that you would like to protect and only be available if user is authenticated, you can make use of our `ReactRouterAuthGuard` component.

#### Example Usage

```tsx
import React, { useState } from 'react';
import { ReactRouterAuthGuard } from '@brightlayer-ui/react-auth-workflow';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ExampleHome } from './ExampleHome';

export const AppRouter: React.FC = () => {
    // You will need to manage the end user's authentication state. isAuthenticated will be managed by some state within your app, in this example, a useApp hook that gets the authentication state.
    const app = useApp();
    
    return (
        <Routes>
            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <ExampleHome />
                    </ReactRouterAuthGuard>
                }
            />
            <Route path={'/'} element={<Navigate to={'/homepage'} replace />} />
            <Route
                path={'*'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <Navigate to={'/login'} />
                    </ReactRouterAuthGuard>
                }
            />
        </Routes>
    );
};
```

### Guest Guard Usage

If there are routes that you would like to be available without logging in (such as a Terms of Service page), you can make use of our `ReactRouterGuestGuard` component.

#### Example Usage

```tsx
import React, { useState } from 'react';
import { 
    AuthContextProvider,
    ContactSupportScreen,
    ForgotPasswordScreen,
    ResetPasswordScreen,
    ReactRouterAuthGuard,
    ReactRouterGuestGuard
} from '@brightlayer-ui/react-auth-workflow';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { ExampleHome } from './ExampleHome';

export const AppRouter: React.FC = () => {
    // You will need to manage the end user's authentication state via the isAuthenticated prop which will be managed by some state within your app, in this example, a useApp hook that gets the authentication state.
    const app = useApp();
    
    return (
        <Routes>
           {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        actions={ProjectAuthUIActions(app)}
                        language={language}
                        navigate={navigate}
                        routeConfig={routes}
                    >
                        <ReactRouterGuestGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/'}>
                            <Outlet />
                        </ReactRouterGuestGuard>
                    </AuthContextProvider>
                }
            >
                <Route path={'/login'} element={<Login />} />
                <Route path={'/forgot-password'} element={<ForgotPasswordScreen />} />
                <Route path={'/contact-support'} element={<ContactSupportScreen />} />
                <Route path={'/reset-password'} element={<ResetPasswordScreen />} />
            </Route>
            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <ExampleHome />
                    </ReactRouterAuthGuard>
                }
            />
            <Route path={'/'} element={<Navigate to={'/homepage'} replace />} />
            <Route
                path={'*'}
                element={
                    <ReactRouterAuthGuard isAuthenticated={app.isAuthenticated} fallBackUrl={'/login'}>
                        <Navigate to={'/login'} />
                    </ReactRouterAuthGuard>
                }
            />
        </Routes>
    );
};
```