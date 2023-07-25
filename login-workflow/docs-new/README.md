# React Auth Workflow

[![](https://img.shields.io/circleci/project/github/etn-ccis/blui-react-workflows/master.svg?style=flat)](https://circleci.com/gh/etn-ccis/blui-react-workflows/tree/master) ![npm (scoped)](https://img.shields.io/npm/v/@brightlayer-ui/react-auth-workflow) [![codecov](https://codecov.io/gh/etn-ccis/blui-react-workflows/branch/master/graph/badge.svg?token=H18T75WBFS)](https://codecov.io/gh/etn-ccis/blui-react-workflows)

The React Auth Workflow package provides a consistent authentication and registration experience across Eaton web applications using React.

This includes pre-built implementations of the screens for Login, Forgot Password, Contact Information, Self-Registration, Registration By Invitation, and a dialog for Change Password.

![Login iOS](https://raw.githubusercontent.com/etn-ccis/blui-react-workflows/master/login-workflow/media/login.png) ![Home iOS](https://raw.githubusercontent.com/etn-ccis/blui-react-workflows/master/login-workflow/media/home.png) ![Password iOS](https://raw.githubusercontent.com/etn-ccis/blui-react-workflows/master/login-workflow/media/password.png)

# Installation

To install the latest version of this package, run:

```shell
npm install --save @brightlayer-ui/react-auth-workflow
// or
yarn add @brightlayer-ui/react-auth-workflow
```

# Integration

You have a few options for using this package in your application. You can manually integrate the package into an existing project, or you can start a project using the `/example` project or by using the Brightlayer UI CLI.

To integrate the package into an existing project, read our [Existing Project Integration](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/existing-project-integration.md) instructions. Even if you aren't starting from scratch, it may be useful for you to refer to the example project while getting started.

To generate a new authentication project using the [Brightlayer UI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli), run:
```shell
npx -p @brightlayer-ui/cli blui new --framework=react-native --template=authentication
```

To use the example project as a starting point, read our [Sample Project Integration](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/sample-project-integration.md) instructions.

---
## Routing

We don't prescribe a routing solution, however we do recommend using [React Router](https://reactrouter.com/). For example usage details, refer to the [Routing](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/routing.md) documentation.

## APIs

More information about React Auth Workflow's exported objects and functions can found in the [API](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/API.md) documentation.

## Error Management

For information about handling error in your application, refer to our [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md) documentation.

## Language Support

For information about supporting multiple languages, refer to our [Language Support](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/language-support.md) guidelines.

## Customizing the Workflow

The workflow allows for some customizations. For details refer to our [Customization](https://github.com/etn-ccis/blui-react-workflows/blob/master/login-workflow/docs/customization.md) documentation.

## Browser Support

Brightlayer UI Login Workflow will work with any modern browser. For details refer to our [Browser Support](https://brightlayer-ui.github.io/development/frameworks-web/react#browser-support) documentation.

---

# Contributors

To work on this package as a contributor, first clone down the repository:

```shell
git clone https://github.com/etn-ccis/blui-react-workflows
cd react-workflows/login-workflow
```

You can install all necessary dependencies and run the demo project by running:

```shell
yarn start:example
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
