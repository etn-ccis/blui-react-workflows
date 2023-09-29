# Migration Guide: v4.x => v5.x

## Update Dependencies

First, update your @brightlayer-ui/react-auth-workflow dependency to the latest version.

```shell
npm install --save @brightlayer-ui/react-auth-workflow@^5.0.0
// or
yarn upgrade @brightlayer-ui/react-auth-workflow@^5.0.0
```

## Managing Auth State

In order to be more flexible / customizable, the workflow no longer manages the authentication status of the user internally. You will need to establish your own mechanism (such as using a ContextProvider or Redux) to track whether or not a user is authenticated to your application. For reference, you can look at how we set up the [AppContext](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/contexts/AppContextProvider.tsx) in the example project.

## Managing Routing

In order to be more flexible / customizable, the workflow no longer manages routing. The `AuthNavigationContainer` has been removed and will need to be replaced by your own routing solution (we recommend React Router). Please follow our [Routing Guide](./routing.md) for detailed information on setup.

## Managing Workflow Providers

We previously provided a `AuthUIContextProvider` component that was used to configure / wrap both the Authentication workflow and the Registration workflow. In version 5, we have split the management of the workflows so that they can be used independently. You will need to implement the [`AuthContextProvider`](authentication-workflow.md) and [`RegistrationContextProvider`](./registration-workflow.md) instead.

## Managing Translations / Internationalization

You no longer need to merge your apps translation data into the workflow — they an exist independently for the sake of simplifying your setup. If you aren't already, you will need to set up [react-i18next](https://react.i18next.com/) to manage your application side translations. Refer to our [Language Support](./language-support.md) guide for more information.

## Updated Actions

### AuthUIActions

The `SecurityContextActions` no longer exist in the newest version and so they will not be available to your action definitions (i.e., `onUserAuthenticated` and `onUserNotAuthenticated` are no longer available). You will need to pass your own self-managed auth state/functions and use those instead (refer to above).

## RegistrationUIActions

1. Update type name `AccountDetailInformation` to `AccountDetails`.

```tsx
// before
import { RegistrationUIActions, AccountDetailInformation } from '@brightlayer-ui/react-auth-workflow';
// after
import { RegistrationUIActions, AccountDetails } from '@brightlayer-ui/react-auth-workflow';
```

2. LoadEULA renamed to loadEula

```tsx
// before
loadEULA: async (language: string): Promise<string> => {
    ...
    return SAMPLE_EULA;
},

// after
loadEula: async (language: string): Promise<string> => {
    ...
    return SAMPLE_EULA;
},
```

3. Additional data available in completeRegistration

The `userData` parameter will now pass all data collected from the registration workflow, including custom data.

The `validationCode` parameter now supports numbers or string.

```tsx
// before
completeRegistration: async (
    userData: {
        password: string;
        accountDetails: AccountDetailInformation;
    },
    validationCode: string,
    validationEmail?: string
): Promise<{ email: string; organizationName: string }> => {
    ...
},

// after
completeRegistration: async (
    userData: any, // TODO: this should be properly typed
    validationCode: string | number,
    validationEmail?: string
): Promise<{ email: string; organizationName: string }> => {
    ...
},
```

4. New actions available

To give greater flexibility / granularity in the workflow, we have added a few more actions in registrationUIActions such as `acceptEula`, `requestRegistrationCode`, `createPassword`, and `setAccountDetails`. Refer to the [Registration Workflow](./registration-workflow.md) Guide for information about these new actions.

## New Setup

Your new app architecture will look something like this once you have made all of the necessary updates:

```tsx
// Your application instance of i18n
<I18nextProvider i18n={i18nAppInstance} defaultNS={'app'}>
    {/* Your custom context provider for managing auth state, etc. */}
    <AppContext.Provider
        value={{
            isAuthenticated,
            onUserAuthenticated: (userData): void => {
                setIsAuthenticated(true);
                setLoginData(userData);
            },
            onUserNotAuthenticated: (userData): void => {
                setIsAuthenticated(false);
            },
            loginData,
            setLoginData,
            language,
            setLanguage,
        }}
    >
        {/* Your implementation of a routing solution */}
        <BrowserRouter basename={'/'}>
            <AuthContextProvider>{/* Auth Routes */}</AuthContextProvider>
            <RegistrationContextProvider>{/* Registration Routes */}</RegistrationContextProvider>
        </BrowserRouter>
    </AppContext.Provider>
</I18nextProvider>
```

Refer to the [Example](../example/) application for detailed reference.
