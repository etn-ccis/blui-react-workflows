# Registration Workflow Guide
The registration workflow is a set of screens that are used to register a user. The registration workflow is managed by the `RegistrationContextProvider` component. The `RegistrationContextProvider` is a React Context Provider that wraps the entire registration workflow. It is responsible for managing the state of the registration workflow and providing the necessary actions to the various screens.

To set up Registration in your app you will need to import the `RegistrationContextProvider` and pass in the necessary props. You will pass in your routes as children to the `RegistrationContextProvider`. More information about React Auth Workflow's exported objects and functions can found in the [API](#api) documentation.

## Implement RegistrationUIActions

You need to implement the backend networking for all networking within react-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep`.

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create a file in the new `actions` directory: `RegistrationUIActions.tsx`
    - The file you created, `RegistrationUIActions.tsx`, will handle the implementation of the registration related actions (such as create password and set account details).
    - You can copy this file directly from the [example](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-auth-workflow for the purposes of compiling with the mock `RegistrationUIActions` before you write your own implementation. These sample implementations make use of the browser LocalStorage, but you may want to use a different approach in order to follow best practices for cybersecurity.

## Example Usage

Here is an example of how you would set this up using our recommended routing solution, [React Router](https://reactrouter.com/):

```tsx
import React from 'react';
import {
    RegistrationContextProvider,
    EulaScreen,
    CreateAccountScreen,
    VerifyCodeScreen,
    CreatePasswordScreen,
    AccountDetailsScreen,
} from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { routes } from '../navigation/Routing';

export const AppRouter: React.FC = () => {
   // Language will be managed by some state within your app, in this example, a useApp hook that gets the app language.
    const { language, yourAppSecurityHelper } = useApp();
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
                <Route path={'/self-registration'} element={<RegistrationWorkflow />} />
                <Route
                    path={'/register-by-invite'}
                    element={
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                            <CreatePasswordScreen />
                            <AccountDetailsScreen />
                        </RegistrationWorkflow>
                    }
                />
            </Route>
            ...
        </Routes>
    );
};
```