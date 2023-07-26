# Integrating Into an Existing Project

To start integrating this package into an existing application, you must first have an application. We recommend using the [Brightlayer UI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) to initialize your project.

### Installation and Setup

Once you have a project, you can install this package via:

```shell
npm install --save @brightlayer-ui/react-auth-workflow
// or
yarn add @brightlayer-ui/react-auth-workflow
```

This package also has a number of peer dependency requirements that you will need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:

```
npm install --save @mui/material @emotion/react @emotion/styled @brightlayer-ui/colors @brightlayer-ui/react-components date-fns i18next react-dom react-i18next react-router-dom
// or
yarn add @mui/material @emotion/react @emotion/styled @brightlayer-ui/colors @brightlayer-ui/react-components date-fns i18next react-dom react-i18next react-router-dom
```

### Implement AuthUIActions and RegistrationUIActions

You need to implement the backend networking for all networking within react-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep` .

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create two files in the new `actions` directory: `AuthUIActions.tsx` and `RegistrationUIActions.tsx`
    - The first file you created, `AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot password).
    - The second file you created, `RegistrationActions.tsx`, will handle the implementation of the registration related actions (such as loading the EULA and registration by invitation).
    - You can copy these files directly from the [example](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-auth-workflow for the purposes of compiling with the mock `AuthUIActions` and `RegistrationUIActions` before you write your own implementation. These sample implementations make use of the browser LocalStorage, but you may want to use a different approach in order to follow best practices for cybersecurity.

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
import { useSecurityActions } from '../path-to-your-use-security-actions-implementation';

export const AppRouter: React.FC = () => {
   // Language will be managed by some state within your app, in this example, a useApp hook that gets the app language.
    const { language } = useApp();
    const navigate = useNavigate();
    const securityContextActions = useSecurityActions();
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route
                element={
                    <AuthContextProvider
                        // @TODO: whats up with the security context actions? 
                        actions={ProjectAuthUIActions(securityContextActions)}
                        language={language}
                        navigate={navigate}
                        routeConfig={routes}
                    >
                        <Outlet />
                    </AuthContextProvider>
                }
            >
                <Route path={'/login'} element={<Login />} />
                <Route path={'/forgot-password'} element={<ForgotPasswordScreen />} />
                <Route path={'/contact-support'} element={<ContactSupportScreen />} />
                <Route path={'/reset-password'} element={<ResetPasswordScreen />} />
            </Route>
            ...
        </Routes>
    );
};
```
<!-- @TODO: dont forget about this -->
#### Available Customizations / Configurations

### Registration

To set up Registration in your app you will need to import the `RegistrationContextProvider` and pass in the necessary props. You will pass in your routes as children to the `RegistrationContextProvider`. More information about React Auth Workflow's exported objects and functions can found in the [API](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/API.md) documentation.

#### Example Usage

Here is an example of how you would set this up using our recommended routing solution, [React Router](https://reactrouter.com/):

```tsx
import React from 'react';
import {
    AccountDetailsScreen,
    CreateAccountScreen,
    CreatePasswordScreen,
    EulaScreen,
    RegistrationContextProvider,
    RegistrationWorkflow,
    VerifyCodeScreen,
    RegistrationSuccessScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { routes } from '../navigation/Routing';

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
                    >
                        <Outlet />
                    </RegistrationContextProvider>
                }
            >
                <Route
                    path={'/self-registration'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreateAccountScreen />
                            <VerifyCodeScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen />
                        </RegistrationWorkflow>
                    }
                />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen />
                            <RegistrationSuccessScreen />
                        </RegistrationWorkflow>
                    }
                />
            </Route>
        </Routes>
    );
};
```

<!-- @TODO: dont forget about this -->
#### Available Customizations / Configurations

### Protecting Your Application Routes
<!-- @TODO: revisit this after auth guard implementation is finished to ensure proper name and usage -->
In order to protect your application routes you can make use of our `ReactAuthGuard` to secure your app.

#### Example Usage

Here is an example of how you would set this up using our recommended routing solution, [React Router](https://reactrouter.com/):

```tsx
import React, { useState } from 'react';
import { ReactAuthGuard } from '@brightlayer-ui/react-auth-workflow';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ExampleHome } from './ExampleHome';
import { LocalStorage } from '../store/local-storage';

export const AppRouter: React.FC = () => {
    // You will need to manage the end user's authentication state. In this example we are using localStorage and an isAuthenticated state variable. Feel free to use whichever solution works with your app state management.
    const authData = LocalStorage.readAuthData();
    const [isAuthenticated, setIsAuthenticated] = useState(authData !== null ? true : false);
    return (
        <Routes>
            {/* USER APPLICATION ROUTES */}
            <Route
                path={'/homepage'}
                element={
                    <ReactAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <ExampleHome />
                    </ReactAuthGuard>
                }
            />
            <Route
                path={'*'}
                element={
                    <ReactAuthGuard
                        isAuthenticated={isAuthenticated}
                        fallbackComponent={<Navigate to={`/login`} />}
                    >
                        <Navigate to={'/login'} />
                    </ReactAuthGuard>
                }
            />
        </Routes>
    );
};
```