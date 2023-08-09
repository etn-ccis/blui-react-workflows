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

Since we have removed `@brightlayer-ui/react-auth-shared` package `SecurityContextActions` are not supported by latest workflow. Instead of this you need to manage your app's state by app context. 

For e.g. you can replace SecurityContextActions with `AppContextType` which you can declare in AppContextProvider. You can check [here](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/contexts/AppContextProvider.tsx) for detailed implementation.

In previous package `onUserAuthenticated`, `onUserNotAuthenticated` were managed by `@brightlayer-ui/react-auth-shared` but in latest you need to manage through app state. For more details you can check Example app's [AuthUIActions Implementation](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/actions/AuthUIActions.tsx)

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
    await sleep(1000);

    if (isRandomFailure()) {
        throw new Error('Sorry, there was a problem sending your request.');
    }

    if (!language.includes('en')) {
        return 'Other language EULA';
    }

    return SAMPLE_EULA;
},
```

// after
```tsx
loadEula: async (language: string): Promise<string> => {
    await sleep(1000);

    if (isRandomFailure()) {
        throw new Error('Sorry, there was a problem sending your request.');
    }

    if (!language.includes('en')) {
        return 'Other language EULA';
    }

    return SAMPLE_EULA;
}
```

#### Update completeRegistration Action

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
    const email = 'example@email.com';
    const organizationName = 'Acme Co.';
    const userInfo = { email, organizationName };

    await sleep(1000);
    if (isRandomFailure()) {
        throw new Error('Sorry, there was a problem sending your request.');
    }
    return userInfo;
},
```

// After
```tsx
completeRegistration: async (
    userData: any,
    validationCode: string | number,
    validationEmail?: string
): Promise<{ email: string; organizationName: string }> => {
    const email = 'example@email.com';
    const organizationName = 'Acme Co.';
    const userInfo = { email, organizationName };

    await sleep(1000);
    if (isRandomFailure()) {
        throw new Error('Sorry, there was a problem sending your request.');
    }
    return userInfo;
},
```

#### Add new actions

We have added few more actions in registraionUIActions such as `acceptEula`, `requestRegistrationCode`, `createPassword`, and `setAccountDetails`.
For more details you can check implementation of Example app's [RegistraionUIActions Implementation](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/actions/RegistrationUIActions.tsx).


### Update you App.tsx

In latest workflow package `SecurityContextProvider`, `useSecurityActions` are not availble instead of this you need to use app context manage app state. Also we have removed `AuthNavigationContainer`

#### Update AuthContextProvider
In earlier package we were passing `registrationActions` prop to `AuthUIContextProvider`. In latest package we have removed `AuthUIContextProvider` and divided our context provider into  `AuthUIContextProvider` and `RegistrationContextProvider`.

#### Router Setup
In latest workflow you need to setup your own routing. For detail information please follow [Routing Guide](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/Routing.md)


#### i18n Setup
In latest workflow you need to setup i18n for your app. For detail information you can check Example app's [i18n Setup](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/translations/i18n.ts). For rendering translations in the app, you need to wrap your app with <I18nextProvider/> similar to [Example App](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/example/src/App.tsx).

