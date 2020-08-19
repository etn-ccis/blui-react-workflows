# React Auth Workflow 

TODO: Update this (it's from React Native)

![npm (scoped)](https://img.shields.io/npm/v/@pxblue/react-native-auth-workflow)

The React Native Auth Workflow package provides a consistent authentication and registration experience across Eaton mobile applications using React Native. 

This includes pre-build implementations of the screens for Login, Forgot Password, Contact Information, Self-Registration, Registration By Invitation, and Change Password.

Integrating the user interface into your application is as easy as providing the API calls for the various authentication and registration actions performed by the user. The `AuthNavigationContainer` automatically handles the presentation of the non-secure (pre-authorization) and secure (custom application) portions of a mobile application. 

**iOS**

![Login iOS](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/ios-login.png) ![Home iOS](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/ios-home.png) ![Password iOS](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/ios-password.png)

**Android**

![Login Android](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/android-login.png) ![Home Android](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/android-home.png) ![Password Android](https://raw.githubusercontent.com/pxblue/react-native-workflows/master/login-workflow/media/android-password.png)


# Installation
To install the latest version of this package, run:
```shell
npm install --save @pxblue/react-native-auth-workflow
// or
yarn add @pxblue/react-native-auth-workflow
```

# Integration
You have two options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project provided in the package. 

To integrate the package into an existing project, read our [Existing Project Integration ](https://github.com/pxblue/react-native-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration ](https://github.com/pxblue/react-native-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.


# Usage (Security State)

After setup, you are now able to access various security actions and state from within your application. Importing `useSecurityActions` and `useSecurityState` allows you use these hooks as follows:

```ts
import {useSecurityActions, useSecurityState } from '@pxblue/react-native-auth-workflow';

const securityActions = useSecurityActions();
const securityState = useSecurityState();
```

The `securityActions` allows you to access actions related to user authentication and de-authentication. You can call `securityActions.onUserNotAuthenticated();` to un-authenticate (i.e. log user out) from the application.

The `securityState` allows you to access state related to security, such as the currently authenticated user's email (`securityState.email`).

More information about React Native Auth Workflow's exported objects can found in the [API](https://github.com/pxblue/react-native-workflows/tree/master/login-workflow/docs/API.md) documentation.


# Deep Linking

The following is a list of the screens and their parameters which a deep link may launch to:

- `login`: the login screen.
- `PasswordResetInitiation`: the first screen of the Password Reset flow.
- `PasswordResetCompletion`: the later half of the Password Reset flow, takes parameter `verifyCode`.
- `RegistrationInvite`: the Registration via Invitation flow, takes parameter `validationCode`.
- `Registration`: the later half of the Self Registration flow, takes parameter: `verificationCode`.
- `SupportContact`: the Contact Support screen.

#### Testing Deep Links

- Test iOS simulator with `xcrun simctl openurl booted authui://invite/8k27jshInvite234Code`
- Test Android with `adb shell am start -W -a android.intent.action.VIEW -d "authui://invite/8k27jshInvite234Code" com.shiverware.eaton.authui`
- Test on device from browser `authui://invite/8k27jshInvite234Code`

Note that the `authui://` prefix is set by your application, as in the file at `example/src/navigation/DeepLinking.ts`.

# APIs
More information about React Native Auth Workflow's exported objects and functions can found in the [API](https://github.com/pxblue/react-native-workflows/tree/master/login-workflow/docs/API.md) documentation.

# Contributors

To work on this package as a contributor, first clone down the repository:
```shell
git clone https://github.com/pxblue/react-native-workflows
cd react-native-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:
```shell
yarn start:example
// or
yarn start:example-android
```

If you make changes to the library components and want to link them to the running example project, you can run:
```shell
yarn link:components
```

You can build the library by running:
```shell
yarn build
```

You can run the Lint checks, prettier formatter, typescript validator, and unit tests by running:
```shell
yarn validate
```

You can update the auto-generated licenses.md file by running:
```shell
yarn generate:licenses
```