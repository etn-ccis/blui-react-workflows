# React Auth Workflow 
![npm (scoped)](https://img.shields.io/npm/v/@pxblue/react-auth-workflow)

The React Auth Workflow package provides a consistent authentication and registration experience across Eaton web applications using React. 

This includes pre-build implementations of the screens for Login, Forgot Password, Contact Information, Self-Registration, Registration By Invitation, and a dialog for Change Password.

Integrating the user interface into your application is as easy as providing the API calls for the various authentication and registration actions performed by the user. The `AuthNavigationContainer` automatically handles the presentation of the non-secure (pre-authorization) and secure (custom application) portions of a mobile application. 

![Login iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/login.png) ![Home iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/home.png) ![Password iOS](https://raw.githubusercontent.com/pxblue/react-workflows/master/login-workflow/media/password.png)


# Installation
To install the latest version of this package, run:
```shell
npm install --save @pxblue/react-auth-workflow
// or
yarn add @pxblue/react-auth-workflow
```

# Integration
You have two options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project provided in the package. 

To integrate the package into an existing project, read our [Existing Project Integration ](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you are starting from scratch, it may be useful for you to refer to the example project while getting started.

To use the example project as a starting point, read our [Sample Project Integration ](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.


# Usage (Security State)

After setup, you are now able to access various security actions and state from within your application. Importing `useSecurityActions` and `useSecurityState` allows you use these hooks as follows:

```ts
import {useSecurityActions, useSecurityState } from '@pxblue/react-auth-workflow';

const securityActions = useSecurityActions();
const securityState = useSecurityState();
```

The `securityActions` allows you to access actions related to user authentication and de-authentication. You can call `securityActions.onUserNotAuthenticated();` to un-authenticate (i.e., log user out) from the application.

The `securityState` allows you to access state related to security, such as the currently authenticated user's email (`securityState.email`).

More information about React Auth Workflow's exported objects can found in the [API](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/API.md) documentation.


# Routing
This library uses [React Router](https://reactrouter.com/) for routing. It includes a `<BrowserRouter>` wrapping the entire application, so in your application, you may skip providing a Router and just render `<Route>`s.

The following is a list of the screens and their available query strings which a deep link may launch to. Some screens take optional query string parameters:

| Screen              | Description                                            | Default URL                  | Query String Params |
| ------------------- | ------------------------------------------------------ | ---------------------------- | ------------------- |
| Login               | the login screen                                       | `'/login'`                   |                     |
| Forgot Password     | the forgot password screen                             | `'/forgot-password'`         |                     |
| Reset Password      | the reset password screen                              | `'/reset-password'`          | `code`, `email`     |
| Invite Registration | the first screen of the invite-based registration flow | `'/register/invite'`         | `code`, `email`     |
| Self Registration   | the first screen of the self-registration flow         | `'/register/create-account'` | `code`, `email`     |
| Support             | the contact/support screen                             | `'/support'`                 |                     |

#### Testing Deep Links

- Open the sample URL in your browser `localhost:3000/register/invite?code=8k27jshInvite234Code`

Note that the base routes for each screen can be customized via a prop on the `<AuthNavigationContainer>`.

# APIs
More information about React Auth Workflow's exported objects and functions can found in the [API](https://github.com/pxblue/react-workflows/tree/master/login-workflow/docs/API.md) documentation.

# Contributors

To work on this package as a contributor, first clone down the repository:
```shell
git clone https://github.com/pxblue/react-workflows
cd react-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:
```shell
yarn start:example
// or
yarn start:example-android
```

If you make changes to the library components and want to link them to the running example project, you can run:
```shell
yarn link:workflow
```

You can build the library by running:
```shell
yarn build
```

You can run the lint checks, prettier formatter, unit tests, and build by running:
```shell
yarn precommit
```

You can update the auto-generated licenses.md file by running:
```shell
yarn generate:licenses
```