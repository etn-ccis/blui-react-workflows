# Customization Guide

These workflows are designed to work out of the box without any additional configuration. However, we understand that you may need to customize certain aspects of the workflows to meet your needs. This guide will walk you through the various ways you can customize the workflow.

## Customizing Screens

All of the screens in the workflow support various levels of customization. Refer to the [Screens](./screens/README.md) documentation for specific options available on each screen.


## Customizing Registration Workflow

The Registration is provided as a single component that will provide the default behavior without requiring any configuration or props.

```tsx
// default appearance / behavior
<RegistrationWorkflow />
```

If you wish to customize any aspects of the workflow screens, you will need to provide them as children in order to access their screen-level props.

```tsx
<RegistrationWorkflow>
    <EulaScreen />
    <CreateAccountScreen />
    <VerifyCodeScreen codeValidator={customValidator}/>
    <CreatePasswordScreen />
    <AccountDetailsScreen />
</RegistrationWorkflow>
```

### Customizing the Screen Order

When passing children to the `RegistrationWorkflow` component, you can easily adjust the order of screens by simply placing them in the order you wish for them to appear.
  
```tsx
<RegistrationWorkflow>
    {/* Create Account screen will now come before the Eula screen */}
    <CreateAccountScreen />
    <EulaScreen />           
    <VerifyCodeScreen />  
    <CreatePasswordScreen />   
    <AccountDetailsScreen /> 
</RegistrationWorkflow>
```

### Removing / Injecting Screens

If you want to skip a particular screen in the workflow, simply omit it in the list of children. Likewise, if you wish to add your own custom screens into the workflow, you simply pass them as another child element.

When passing custom children, it is important to match the look and feel of the other steps in the workflow. In order to support this, we provide several WorkflowCard components that you can use to create your custom screens. For more information on how to use these components, refer to our [WorkflowCard](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/components/workflow-card.md) component documentation. 

Your custom implementation, removing the EulaScreen and VerifyCodeScreen, and adding a custom screen, might look like this:

```jsx
<RegistrationWorkflow initialScreenIndex={0}>
    <EulaScreen />
    <CreateAccountScreen />
    <VerifyCodeScreen codeValidator={customValidator}/>
    {/* Skip the Create Password scree */}
    {/* <CreatePasswordScreen /> */}
    <AccountDetailsScreen />
    {/* Add a custom screen to collect more information */}
    <CustomAdditionalDetailsScreen>
</RegistrationWorkflow>
```

### Customizing the Success Screen
You may provide a custom success screen to be shown upon successful completion of the [Registration Workflow](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/components/registration-workflow.md). The [Success Screen](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/screens/success.md) is used by default, but may be customized via props. If you wish to build your own success screen it may look something like this:

```jsx
import { SuccessScreenBase } from '@brightlayer-ui/react-auth-workflow';

const MyCustomSuccessScreen = () => {
  return (
    <SuccessScreenBase 
        messageTitle={'Congratulations!'}
        message={'You have been registered successfully'}
    />
  );
};

<RegistrationWorkflow successScreen={<MyCustomSuccessScreen />} />
```

A similar prop exists for `existingAccountSuccessScreen` which will be used if the account being registered already exists.


## Customizing the Language Support

For information about supporting multiple languages and customizing the translations, refer to our [Language Support](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/language-support.md) guidelines.

## Customizing Error Handling

For information about handling errors in your application, refer to our [Error Management](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/docs/error-management.md) documentation.

## Components
For more details on customizing our components, refer to our [Components](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/components/components.md) documentation. 

## Screens
For more details on customizing our screens, refer to our [Screens](https://github.com/etn-ccis/blui-react-workflows/tree/master/login-workflow/screens/screens.md) documentation.