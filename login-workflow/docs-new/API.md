# API
This document outlines the various exports and configuration options for the React Auth Workflow package.

The majority of the types and export used in this package come from @brightlayer-ui/react-auth-shared. You can read about those exported objects and functions in their [API](https://github.com/etn-ccis/blui-react-auth-shared/tree/master/docs/API.md) documentation.

## AuthContextProviderProps

### Usage

### Type Declaration
 
```tsx
{
    actions: () => AuthUIActions;
    language: string;
    navigate: (url: string) => void;
    routeConfig: RouteConfig;
    i18n?: i18n;
    rememberMeDetails?: {
        /**
         * Email address to show in the email field of Login after logout.
         */
        email?: string;
        /**
         * When true, the user's email will be in the email field of Login.
         */
        rememberMe?: boolean;
    };
    errorConfig?: ErrorContextProviderProps;
}
```

## AuthUIActions

### Usage

### Type Declaration

```tsx
{
    initiateSecurity: () => Promise<void>;
    logIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verifyResetCode: (code: string, email?: string) => Promise<void>;
    setPassword: (code: string, password: string, email?: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};
```

## RegistrationContextProviderProps

### Usage

### Type Declaration

```tsx
{
    actions?: () => RegistrationUIActions;
    language: string;
    navigate: (url: string) => void;
    routeConfig: RouteConfig;
    i18n?: i18n;
    errorConfig?: ErrorContextProviderProps;
};
```

## RegistrationUIActions

### Usage

### Type Declaration

```tsx
{
    loadEula?: (language: string) => Promise<string>;
    acceptEula?: () => Promise<boolean>;
    requestRegistrationCode?: (email: string) => Promise<string>;
    validateUserRegistrationRequest?: (validationCode: string, validationEmail?: string) => Promise<boolean>;
    createPassword?: (password: string) => Promise<boolean>;
    setAccountDetails?: (details: AccountDetails) => Promise<boolean>;
    completeRegistration?: (userData: any, validationCode: number | string, validationEmail: string) => Promise<{
        email: string;
        organizationName: string;
    }>;
};
```

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