# Update React Auth Workflow Package

Update @brightlayer-ui/react-auth-workflow package to latest version.
```shell
npm install --save @brightlayer-ui/react-auth-workflow
// or
yarn upgrade @brightlayer-ui/react-auth-workflow
```

## Remove @brightlayer-ui/react-auth-shared package

In latest version we have removed @brightlayer-ui/react-auth-shared.

## Update AuthUIActions

`SecurityContextActions` are not supported by the latest workflow. Instead of this, you will need to manage your app's authentication state by other means e.g., a custom context. 

For example, you can replace `SecurityContextActions` with `AppContextType` which you can declare in `AppContextProvider`. You can see how we handle this in our [Example Project AppContextProvider](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/contexts/AppContextProvider.tsx).

In previous versions of this package, the `onUserAuthenticated` and `onUserNotAuthenticated` values were managed for you, but in the latest version, you need to manage this state on your own. For more details, you can check the example app's [AuthUIActions Implementation](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/actions/AuthUIActions.tsx).

## Update RegistrationUIActions

Update type name `AccountDetailInformation` to `AccountDetails`.

// before
```tsx
import { RegistrationUIActions, AccountDetailInformation } from '@brightlayer-ui/react-auth-workflow';
```

// after
```tsx
import { RegistrationUIActions, AccountDetails } from '@brightlayer-ui/react-auth-workflow';
```

### Fix Following Actions in RegistrationUIActions.tsx

#### Rename `loadEULA` action to `loadEula`.
// before
```tsx
loadEULA: async (language: string): Promise<string> => {
    ...
    return SAMPLE_EULA;
},
```

// after
```tsx
loadEula: async (language: string): Promise<string> => {
    ...
    return SAMPLE_EULA;
},
```

#### Update completeRegistration Action
In the latest package type of few parameters of completeRegistration have changed. Such as the `userData` parameter accepting only password and accoundDetails. Now you can pass on other user-related details as well. Also, the earlier `validationCode` parameter supported only strings, now you can pass numbers also.

// Before
```tsx
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
```

// After
```tsx
completeRegistration: async (
    userData: any,
    validationCode: string | number,
    validationEmail?: string
): Promise<{ email: string; organizationName: string }> => {
    ...
},
```

#### Add new actions

We have added a few more actions in registraionUIActions such as `acceptEula`, `requestRegistrationCode`, `createPassword`, and `setAccountDetails`.
For more details, you can check the example app's [RegistraionUIActions Implementation](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/actions/RegistrationUIActions.tsx).


### Update your App.tsx

In the latest workflow package the `SecurityContextProvider` and `useSecurityActions` are not available. Instead of these, you need to use some other means of managing the app state. We have also removed `AuthNavigationContainer`.

#### Update AuthContextProvider
In previous versions of this package, we were passing a `registrationActions` prop to `AuthUIContextProvider`. In the latest package, we have removed `AuthUIContextProvider` and divided our context provider into  `AuthUIContextProvider` and `RegistrationContextProvider`.

#### Router Setup
In the latest workflow, you need to set up your own routing. For detailed information please follow our [Routing Guide](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/Routing.md).


#### i18n Setup
In the latest workflow, you need to set up i18n for your app. For detailed information you can check the example app's [i18n Setup](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/translations/i18n.ts). For rendering translations in the app, you need to wrap your app with an  <I18nextProvider/> similar to the [Example App](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/App.tsx).

