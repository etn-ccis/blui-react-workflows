# API
This document outlines the various exports and configuration options for the React Auth Workflow package.

The majority of the types and export used in this package come from @brightlayer-ui/react-auth-shared. You can read about those exported objects and functions in their [API](https://github.com/brightlayer-ui/react-auth-shared/tree/master/docs/API.md) documentation.

## Components

### AuthNavigationContainer
Container component which holds the authentication and navigation state and screens. This should be rendered at the root wrapping the whole app (except for the Context Provider components). The URL used for each screen in the authentication workflow can be customized

#### Usage
```tsx
import { AuthNavigationContainer } from '@brightlayer-ui/react-auth-workflow';

<AuthNavigationContainer routeConfig={customRoutes}>
    { /* ...contents */ }
</AuthNavigationContainer>
```

#### Available Props

-   **routeConfig** (optional): _`RouteConfig`_
    -   Details the custom routes to use for any or all of the screens in the workflow.
-   **extraRoutes** (optional): _`JSX.ELement[]`_
    -   Additional routes that you would like to be accessible to the user without logging in (e.g. Terms of Service, etc.). Each child in the array should be an individual `<Route>` component.

### ContactSupportContent
Contents used in the Contact/Support screen. These are exported so that you can present this same information elsewhere in the main content of your application if you so desire.

#### Usage
```tsx
import { ContactSupportContent } from '@brightlayer-ui/react-auth-workflow';

<ContainerComponent>
    <ContactSupportContent />
</ContainerComponent>
```

# Type Definitions

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