# Authentication Workflow Guide
The authentication workflow is a set of screens that are used to authenticate a user. The authentication workflow is managed by the `AuthContextProvider` component. The `AuthContextProvider` is a React Context Provider that wraps the entire authentication workflow. It is responsible for managing the state of the authentication workflow and providing the necessary actions to the various screens.

To set up Authentication in your app you will need to import the `AuthContextProvider` and pass in the necessary props. You will pass in your routes as children to the `AuthContextProvider`. More information about React Auth Workflow's exported objects and functions can found in the [API](#api) documentation.

## Implement AuthUIActions

You need to implement the backend networking for all networking within react-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep` .

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create two files in the new `actions` directory: `AuthUIActions.tsx`
    - The file you created, `AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot password).
    - You can copy this file directly from the [example](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-auth-workflow for the purposes of compiling with the mock `AuthUIActions` before you write your own implementation. These sample implementations make use of the browser LocalStorage, but you may want to use a different approach in order to follow best practices for cybersecurity.

## Example Usage

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

## API

### AuthContextProviderProps
The `AuthContextProvider` manages the state of the authentication workflow. It is a React Context Provider that wraps the entire authentication workflow. It is responsible for managing the state of the authentication workflow and providing the necessary actions to the various screens. The `AuthContextProviderProps` type is used to configure the `AuthContextProvider`.

-   **actions**:  _`() => AuthUIActions`_
    -   A function that returns an object of functions that are used to manage the authentication workflow. See [AuthUIActions](#authuiactions) for more information.
-  **language**: _`string`_
   -    The language code to use for the authentication workflow. This is used to determine which language to use for the UI and for the API calls.
-   **navigate**: _`(url: string) => void`_
    -   A function that is used to navigate to a new URL. This is used to navigate to the various screens of the authentication workflow.
-  **routeConfig**: _`RouteConfig`_
    -   An object that defines the various routes for the authentication workflow. See [RouteConfig](#routeconfig) for more information.
-  **i18n**: (optional) _`i18n`_
    -   An optional i18n object that is used to translate the UI. If not provided, the default i18n object will be used.
- **rememberMeDetails**: (optional) _`{ email?: string, rememberMe?: boolean }`_
    -   An optional object that is used to pre-populate the email field of the Login screen and to determine if the user should be remembered. If not provided, the email field will be empty and the user will not be remembered.
- **errorConfig**: (optional) _`ErrorContextProviderProps`_
    -   An optional object that is used to configure the error handling of the authentication workflow. See [ErrorContextProviderProps](#errorcontextproviderprops) for more information.

### AuthUIActions

-   **initiateSecurity**: _`() => Promise<void>`_
    -   A function that is used to initiate the security context. This function will be called when the application is first loaded.
-  **logIn**: _`(email: string, password: string, rememberMe: boolean) => Promise<void>`_
   -    A function that is used to log in a user. This function will be called when the user clicks the Login button on the Login screen.
-  **forgotPassword**: _`(email: string) => Promise<void>`_
   -    A function that is used to request a password reset code. This function will be called when the user clicks the Next button on the Forgot Password screen.
-  **verifyResetCode**: _`(code: string, email?: string) => Promise<void>`_
   -    A function that is used to verify a password reset code.
-  **setPassword**: _`(code: string, password: string, email?: string) => Promise<void>`_
   -   A function that is used to set a new password. This function will be called when the user clicks the Next button on the Reset Password screen.
-  **changePassword**: _`(oldPassword: string, newPassword: string) => Promise<void>`_
   -   A function that is used to change a user's password. This function will be called when the user clicks the Next button on the Change Password screen.

### RouteConfig
Type to represent the customizable route configuration of the authentication screens.

-   **LOGIN**: (optional) _`string`_
    -   The URL path for the Login screen
-   **FORGOT_PASSWORD**: (optional) _`string`_
    -   The URL path for the Forgot Password screen
-   **RESET_PASSWORD**: (optional) _`string`_
    -   The URL path for the Reset Password screen
-   **SUPPORT**: (optional) _`string`_
    -   The URL path for the Contact/Support screen

### ErrorContextProviderProps
The `ErrorContextProvider` manages the state of the error handling. It is a React Context Provider that is embedded into the entire authentication workflow. It is responsible for managing the state of the error handling and providing the necessary actions to the various screens. The `ErrorContextProviderProps` type is used to configure the `ErrorContextProvider`.

-  **mode**: (default: "dialog") _`"dialog" | "message-box" | "none"`_
    -   The mode to use for displaying errors. If set to "dialog", errors will be displayed in a dialog. If set to "message-box", errors will be displayed in a message box. If set to "none", errors will not be displayed.
- **onClose**: (optional) _`() => void`_
    -   A function that is called when the error dialog is closed.
- **dialogConfig**: (optional) _`{ title?: string, dismissLabel?: string }`_
    -   An optional object that is used to configure the error dialog. See [DialogConfig](#dialogconfig) for more information.
- **messageBoxConfig**: (optional) _`{ dismissible?: boolean, position?: "top" | "bottom", fontColor?: string, backgroundColor?: string, sx?: SxProps }`_
    -   An optional object that is used to configure the error message box. See [MessageBoxConfig](#messageboxconfig) for more information.
  
### DialogConfig
Type to represent the customizable configuration of the error dialog.

- **title**: (optional) _`string`_
    -   The title to display in the error dialog.
- **dismissLabel**: (optional) _`string`_
    -   The label to display on the dismiss button in the error dialog.

### MessageBoxConfig
Type to represent the customizable configuration of the error message box.

- **dismissible**: (default: true) _`boolean`_
    -   Determines if the error message box can be dismissed.
- **position**: (default: "top") _`"top" | "bottom"`_
    -   Determines if the error message box should be displayed at the top or bottom of the screen.
- **fontColor**: (default: "#ffffff") _`string`_
    -   The font color to use for the error message box.
- **backgroundColor**: (default: theme.palette.error.main) _`string`_
    -   The background color to use for the error message box.