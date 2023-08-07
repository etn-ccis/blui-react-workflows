# Customization Guide
While the default workflow is designed to work for most applications, we understand that you may need to customize the workflow to meet your needs. This guide will walk you through the various ways you can customize the workflow.

## Customizing Registration Workflow

### Customizing the Screen Order
You may want to customize the order of your screens within the workflow. In order to do this you will need to import the screens you want to use and pass them as children to the `RegistrationWorkflow` component. The screens will render in the order they are passed in.

Our default implementation looks like this:
  
```jsx
<RegistrationWorkflow initialScreenIndex={0}>
    <EulaScreen />              // screen1
    <CreateAccountScreen />     // screen2
    <VerifyCodeScreen />        // screen3
    <CreatePasswordScreen />    // screen4
    <AccountDetailsScreen />    // screen5
</RegistrationWorkflow>
```

### Custom Screens
You may inject your own custom screens into the workflow by creating your own custom screens. In order to make this easier for you we have provided components to keep the look and feel consistent with the rest of the workflow. For more information on how to use these components, refer to our [WorkflowCard](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/components/workflow-card.md) component documentation. After you have created your custom screens, you can pass them as children to the `RegistrationWorkflow` component. The screens will render in the order they are passed in.

Your custom implementation, removing the EulaScreen and VerifyCodeScreen, and adding a custom screen, might look like this:

```jsx
<RegistrationWorkflow initialScreenIndex={0}>
    <CreateAccountScreen />    // screen1
    <MyCustomScreen />         // screen2
    <CreatePasswordScreen />   // screen3
    <AccountDetailsScreen />   // screen4
</RegistrationWorkflow>
```

<!-- ### Customizing the Registration Success Screen -->
<!-- @TODO... or not to do. This is just a prop on the screens it is used for. Do we need an in depth example or do the API docs cover it? -->

## Customizing the Pre-built Screens
Many of the components and screens used to build the core workflow have been exported so you can easily customize the login and registration workflows. These Customization can be made via props on our [Components](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/components/components.md) and [Screens](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/screens/screens.md). 

An example of this would be passing in props for the Login screen as follows:
```tsx
import React from 'react';
import { LoginScreen } from '@brightlayer-ui/react-auth-workflow';
import Logo from '<path-to-logo>';

export const Login = (): JSX.Element => (
    <LoginScreen
        projectImage={
            <img src={Logo} alt="logo" style={{ maxHeight: 80 }} />
        }
        onLogin={(username: any, password: any): void => {
            setRememberEmail(username);
            setIsAuthenticated(true);
            navigate('/guarded');
        }}
        usernameTextFieldProps={{
            inputProps: {
                maxLength: 30,
            },
        }}
        passwordTextFieldProps={{
            required: true,
        }}
    />
);
```

## Customizing the Language Support

For information about supporting multiple languages and customizing the translations, refer to our [Language Support](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/language-support.md) guidelines.
## Customizing the Routing

We don't prescribe a routing solution, however we do recommend using [React Router](https://reactrouter.com/). For example usage details, refer to the [Routing](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/routing.md) documentation.

## Customizing Error Handling

For information about handling errors in your application, refer to our [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md) documentation.

<!-- Is this clause/link redundant -->
## Components
For more details on customizing our components, refer to our [Components](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/components/components.md) documentation. 

<!-- Is this clause/link redundant -->
## Screens
For more details on customizing our screens, refer to our [Screens](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/screens/screens.md) documentation.