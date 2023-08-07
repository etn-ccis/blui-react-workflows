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
import { RegistrationContextProvider } from '@brightlayer-ui/react-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigate } from 'react-router';
import { ProjectRegistrationUIActions } from '../actions/RegistrationUIActions';
import { Outlet, Route, Routes } from 'react-router-dom';
import { routes } from '../navigation/Routing';
import { i18nAppInstance } from '../translations/i18n';

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
                <Route path={'/self-registration'} element={<RegistrationWorkflow />} />
                <Route path={'/register-by-invite'} element={<RegistrationWorkflow isInviteRegistration />} />
            </Route>
            ...
        </Routes>
    );
};
```

## API

### RegistrationContextProviderProps
The `RegistrationContextProvider` manages the state of the registration workflow. It is a React Context Provider that wraps the entire registration workflow. It is responsible for managing the state of the registration workflow and providing the necessary actions to the various screens. The `RegistrationContextProviderProps` type is used to configure the `RegistrationContextProvider`.

-   **actions**:  _`() => RegistrationUIActions`_
    -   A function that returns an object of functions that are used to manage the registration workflow. See [RegistrationUIActions](#registrationuiactions) for more information.
-  **language**: _`string`_
   -    The language code to use for the registration workflow. This is used to determine which language to use for the UI and for the API calls.    
-   **navigate**: _`(url: string) => void`_
    -   A function that is used to navigate to a new URL. This is used to navigate to the various screens of the registration workflow.   
-  **routeConfig**: _`RouteConfig`_
    -   An object that defines the various routes for the registration workflow. See [RouteConfig](#routeconfig) for more information.
-  **i18n**: (optional) _`i18n`_
    -   An optional i18n object that is used to translate the UI. If not provided, the default i18n object will be used.
- **errorConfig**: (optional) _`ErrorContextProviderProps`_
    -   An optional object that is used to configure the error handling of the registration workflow. See [ErrorContextProviderProps](#errorcontextproviderprops) for more information.

### RegistrationUIActions

-   **loadEula**: _`(language: string) => Promise<string>`_
    -   A function that is used to load the Eula content. This function will be called when the Eula screen is loaded.
-   **acceptEula**: _`() => Promise<boolean>`_
    -   A function that is called when the user clicks the Next button on the Eula screen when checkbox is checked.    
-   **requestRegistrationCode**: _`(email: string) => Promise<string>`_
    -   A function that is used to request  registration code. This function will be called when the user clicks the Next button on the Create Account screen or Resend button on Verify Code screen.      
-   **validateUserRegistrationRequest**: _`(validationCode: string, validationEmail?: string) => Promise<boolean>`_
    -   A function that is used to verify  registration code. This function will be called when the user clicks the Next button on the Verify Code screen. 
-   **createPassword**: _`(password: string) => Promise<boolean>`_
    -   A function that is used to create password. This function will be called when the user clicks the Next button on the Create Password screen. 
-   **setAccountDetails**: _`(details: {
        firstName: string;
        lastName: string;
        extra?: { [key: string]: boolean | string | number };
    }) => Promise<boolean>`_
    -   A function that is used to set account details. This function will be called when the user clicks the Next button on the Account Details screen. 
-   **completeRegistration**: _`(
        userData: any,
        validationCode: number | string,
        validationEmail: string) => Promise<{ email: string; organizationName: string }>`_
    -   A function that is used to complete the registration workflow. This function will be called when the user clicks the Next button on the last registration workflow screen. 

### RouteConfig
Type to represent the customizable route configuration of the registration screens.

-   **REGISTER_INVITE**: (optional) _`string`_
    -   The URL path for the create account via invitation screens
-   **REGISTER_SELF**: (optional) _`string`_
    -   The URL path for the create account via self-registration screens


### ErrorContextProviderProps
The `ErrorContextProvider` manages the state of the error handling. It is a React Context Provider that is embedded into the entire registration workflow. It is responsible for managing the state of the error handling and providing the necessary actions to the various screens. The `ErrorContextProviderProps` type is used to configure the `ErrorContextProvider`.

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