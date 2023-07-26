# API
This document outlines the various exports and configuration options for the React Auth Workflow package.

## AuthContextProviderProps
The `AuthContextProvider` manages the state of the authentication workflow. It is a React Context Provider that wraps the entire authentication workflow. It is responsible for managing the state of the authentication workflow and providing the necessary actions to the various screens. The `AuthContextProviderProps` type is used to configure the `AuthContextProvider`.

### Type Declaration
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

## AuthUIActions

### Type Declaration
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

## RegistrationContextProviderProps
The `RegistrationContextProvider` manages the state of the registration workflow. It is a React Context Provider that wraps the entire registration workflow. It is responsible for managing the state of the registration workflow and providing the necessary actions to the various screens. The `RegistrationContextProviderProps` type is used to configure the `RegistrationContextProvider`.

### Type Declaration
-  **actions**:  _`() => RegistrationUIActions`_
    -   A function that returns an object of functions that are used to manage the registration workflow. See [RegistrationUIActions](#registrationuiactions) for more information.
-  **language**: _`string`_
    -   The language code to use for the registration workflow. This is used to determine which language to use for the UI and for the API calls.
-  **navigate**: _`(url: string) => void`_
    -   A function that is used to navigate to a new URL. This is used to navigate to the various screens of the registration workflow.
-  **routeConfig**: _`RouteConfig`_
    -   An object that defines the various routes for the registration workflow. See [RouteConfig](#routeconfig) for more information.
-  **i18n**: (optional) _`i18n`_
    -   An optional i18n object that is used to translate the UI. If not provided, the default i18n object will be used.
-  **errorConfig**: (optional) _`ErrorContextProviderProps`_
    -   An optional object that is used to configure the error handling of the registration workflow. See [ErrorContextProviderProps](#errorcontextproviderprops) for more information.

## RegistrationUIActions

### Type Declaration
-  **loadEula**: _`(language: string) => Promise<string>`_
    -   A function that is used to load the EULA. This function will be called when the user lands on the EULA screen.
- **acceptEula**: _`() => Promise<boolean>`_
    -   A function that is used to accept the EULA. This function will be called when the user clicks the Next button on the EULA screen.
- **requestRegistrationCode**: _`(email: string) => Promise<string>`_
    -   A function that is used to request a registration code. This function will be called when the user lands on the Verify Code screen as well as when a user clicks the Resend Verification Code button.
- **validateUserRegistrationRequest**: _`(validationCode: string, validationEmail?: string) => Promise<boolean>`_
    -   A function that is used to validate a registration code. This function will be called when the user clicks the Next button on the Verify Code screen screen.
- **createPassword**: _`(password: string) => Promise<boolean>`_
    -   A function that is used to create a password. This function will be called when the user clicks the Next button on the Create Password screen.
- **setAccountDetails**: _`(details: AccountDetails) => Promise<boolean>`_
    -   A function that is used to set the account details. This function will be called when the user clicks the Next button on the Account Details screen.
- **completeRegistration**: _`(userData: any, validationCode: number | string, validationEmail: string) => Promise<{ email: string, organizationName: string }>`_
    -   A function that is used to complete the registration. This function will be called when the user clicks the Next button on the final registration workflow screen.

## RouteConfig

Type to represent the customizable route configuration of the authentication screens.

### Type Declaration

-   **LOGIN**: (optional) _`string`_
    -   The URL path for the Login screen
-   **FORGOT_PASSWORD**: (optional) _`string`_
    -   The URL path for the Forgot Password screen
-   **RESET_PASSWORD**: (optional) _`string`_
    -   The URL path for the Reset Password screen
-   **REGISTER_INVITE**: (optional) _`string`_
    -   The URL path for the create account via invitation screens
-   **REGISTER_SELF**: (optional) _`string`_
    -   The URL path for the create account via self-registration screens
-   **SUPPORT**: (optional) _`string`_
    -   The URL path for the Contact/Support screen

## ErrorContextProviderProps
The `ErrorContextProvider` manages the state of the error handling. It is a React Context Provider that is embedded into the entire authentication workflow. It is responsible for managing the state of the error handling and providing the necessary actions to the various screens. The `ErrorContextProviderProps` type is used to configure the `ErrorContextProvider`.

### Type Declaration
-  **mode**: (default: "dialog") _`"dialog" | "message-box" | "none"`_
    -   The mode to use for displaying errors. If set to "dialog", errors will be displayed in a dialog. If set to "message-box", errors will be displayed in a message box. If set to "none", errors will not be displayed.
- **onClose**: (optional) _`() => void`_
    -   A function that is called when the error dialog is closed.
- **dialogConfig**: (optional) _`{ title?: string, dismissLabel?: string }`_
    -   An optional object that is used to configure the error dialog. See [DialogConfig](#dialogconfig) for more information.
- **messageBoxConfig**: (optional) _`{ dismissible?: boolean, position?: "top" | "bottom", fontColor?: string, backgroundColor?: string, sx?: SxProps }`_
    -   An optional object that is used to configure the error message box. See [MessageBoxConfig](#messageboxconfig) for more information.
  
## DialogConfig
Type to represent the customizable configuration of the error dialog.

### Type Declaration
- **title**: (optional) _`string`_
    -   The title to display in the error dialog.
- **dismissLabel**: (optional) _`string`_
    -   The label to display on the dismiss button in the error dialog.

## MessageBoxConfig
Type to represent the customizable configuration of the error message box.

### Type Declaration
- **dismissible**: (default: true) _`boolean`_
    -   Determines if the error message box can be dismissed.
- **position**: (default: "top") _`"top" | "bottom"`_
    -   Determines if the error message box should be displayed at the top or bottom of the screen.
- **fontColor**: (default: "#ffffff") _`string`_
    -   The font color to use for the error message box.
- **backgroundColor**: (default: theme.palette.error.main) _`string`_
    -   The background color to use for the error message box.

## Components

### Screens
- [AccountDetailsScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/account-details.md)
- [ContactScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/contact.md)
- [CreateAccountScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/create-account.md)
- [CreatePasswordScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/create-password.md)
- [EulaScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/eula.md)
- [ForgotPasswordScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/forgot-password.md)
- [LoginScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/login.md)
- [ResetPasswordScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/reset-password.md)
- [VerifyCodeScreen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/verify-code.md)