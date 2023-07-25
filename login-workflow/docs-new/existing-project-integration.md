# Integrating Into an Existing Project

To start integrating this package into an existing application, you must first have an application. We recommend using the [Brightlayer UI CLI](https://www.npmjs.com/package/@brightlayer-ui/cli) to initialize your project.

### Installation and Setup

Once you have a project, you can install this package via:

```shell
npm install --save @brightlayer-ui/react-auth-workflow
// or
yarn add @brightlayer-ui/react-auth-workflow
```

This package also has a number of peer dependency requirements that you will need to install in your project. To install the latest version of all of these peer dependencies, run the following command in your project root:

```
npm install --save @mui/material @emotion/react @emotion/styled @brightlayer-ui/colors @brightlayer-ui/react-components date-fns i18next react-dom react-i18next react-router-dom
// or
yarn add @mui/material @emotion/react @emotion/styled @brightlayer-ui/colors @brightlayer-ui/react-components date-fns i18next react-dom react-i18next react-router-dom
```

### Implement AuthUIActions and RegistrationUIActions

You need to implement the backend networking for all networking within react-auth-workflow. Your implementation will likely involve writing calls to your APIs and caching the returned data, as needed, depending on the requirements of your application. The example application has these actions mocked with calls to `sleep` .

1. Create a `/src` folder in your application if it does not already exist
2. Add an `/actions` folder inside the `src` directory.
3. Create two files in the new `actions` directory: `AuthUIActions.tsx` and `RegistrationUIActions.tsx`
    - The first file you created, `AuthUIActions.tsx`, will handle the implementation of the authentication related actions (such as login and forgot password).
    - The second file you created, `RegistrationActions.tsx`, will handle the implementation of the registration related actions (such as loading the EULA and registration by invitation).
    - You can copy these files directly from the [example](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/example) project as a starting point and then update the implementation details if you choose.
4. You might also want to copy over the `example/src/store` and `example/src/constants` folders from react-auth-workflow for the purposes of compiling with the mock `AuthUIActions` and `RegistrationUIActions` before you write your own implementation. These sample implementations make use of the browser LocalStorage, but you may want to use a different approach in order to follow best practices for cybersecurity.

### Authentication

#### Individual Screen / Components
#### Wrapping Screens with AuthContextProvider / Routes
#### Connecting the actions / API calls
#### Available Customizations / Configurations

### Registration
#### Individual Screens / Components
#### Using the RegistrationWorkflow component
#### Wrapping RegistrationWorkflow with RegistrationContextProvider / Route
#### Connecting to actions / API calls
#### Available Customizations / Configurations